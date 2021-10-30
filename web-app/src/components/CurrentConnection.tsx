import { useMetamask } from "use-metamask";

const CurrentConnection = () => {
  const { metaState } = useMetamask();
  return (
    <small>Current Account(s): {metaState?.account?.join(',')}</small>
  )
}

export default CurrentConnection;