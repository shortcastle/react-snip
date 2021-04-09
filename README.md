# React Snip

A React Component to Snip Web Page.

## Usage

```
function App() {

  const [visible, setVisible] = useState(false);

  return (
    <ReactSnip
      visible={visible}
      onSnap={(canvas) => {
        console.log(canvas);
      }}
      onClose={() => {
        setVisible(false);
      }}
    />
  );
}
```
