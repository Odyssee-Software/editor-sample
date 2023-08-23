export const Icon = (props:{
  type : 'background' | 'mask';
  path : string;
}) => {
  return <div style = {`--background=url(${props.path})`}>
    <icon
      _afterMounting = {(target:HTMLUnknownElement) => {

      }}
    />
  </div>
}