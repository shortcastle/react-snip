# React Snip

A React Component to Snip Web Page.

## Usage

```
function App() {
  const [visible, setVisible] = useState(false);

  return (
    <div>
      <button onClick={() => setVisible(true)}>
        Click here to snip web page
      </button>
      <ReactSnip
        visible={visible}
        onSnap={(canvas) => {
          console.log(canvas);
        }}
        onClose={() => {
          setVisible(false);
        }}
      />
    </div>
  );
}
```
