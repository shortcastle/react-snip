# React Snip

A React Component to Snip Web Page.

## Usage

```
<ReactSnip
    visible={visible}
    onSnap={(canvas) => {
    console.log({ canvas });
    }}
    onClose={() => {
    setVisible(false);
    }}
/>
```
