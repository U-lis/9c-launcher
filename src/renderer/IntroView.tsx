import React from "react";
import { observer, inject } from "mobx-react";
import { IStoreContainer } from "../interfaces/store";
import { useProtectedPrivateKeysQuery } from "../generated/graphql";

import { useLocale } from "./i18n";

const IntroView = observer(({ accountStore, routerStore }: IStoreContainer) => {
  const { loading, error, data } = useProtectedPrivateKeysQuery({
    fetchPolicy: "no-cache",
  });

  const { locale } = useLocale("intro");

  React.useEffect(() => {
    if (!loading && data?.keyStore?.protectedPrivateKeys !== undefined) {
      if (data?.keyStore?.protectedPrivateKeys.length < 1) {
        routerStore.push("/main");
      } else {
        const addresses = data.keyStore.protectedPrivateKeys.map(
          (value) => value?.address
        );
        addresses.map((value) => {
          accountStore.addresses.includes(value)
            ? null
            : accountStore.addAddress(value);
        });

        routerStore.push("/login");
      }
    }
  }, [loading, data]);

  return <div>{locale("now loading...")}</div>;
});

export default inject("accountStore", "routerStore")(IntroView);
