/*global browser*/

function Banana() {
  const replace = async () => {
    browser.tabs
      .query({ active: true, currentWindow: true })
      .then(runScript)
      .catch(reportError);

  };

  async function runScript(tabs: browser.tabs.Tab[]) {
    if (!tabs || !tabs[0] || !tabs[0].id) return;
    await browser.tabs.executeScript(tabs[0].id, {
      file: "/replace-banana.js",
    });
  }

  return (
    <div>
      <button onClick={replace}>Replace everything</button>
    </div>
  );
}

export default Banana;
