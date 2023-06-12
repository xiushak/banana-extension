/*global browser*/

function Banana() {
  const replace = async () => {
    console.log("hi");
    // const popupParameters = await browser.runtime.sendMessage(
    //   "getPopupParameters"
    // );
    // console.log("hi again");
    // let { tabId, frameId, targetElementId } = popupParameters;
    // console.log("hi again again");

    // console.log(tabId);
    browser.tabs
      .query({ active: true, currentWindow: true })
      .then(runScript)
      .catch(reportError);

    // // await assertIsCurrentTab(tabId);
    // await browser.tabs.executeScript(currentTab.id, {
    //   file: "/replace-banana.js",
    // });

    console.log("file called");
  };

  async function runScript(tabs: browser.tabs.Tab[]) {
    if (!tabs || !tabs[0] || !tabs[0].id) return;
    await browser.tabs.executeScript(tabs[0].id, {
      file: "/replace-banana.js",
    });
  }

  // async function assertIsCurrentTab(tabId: any) {
  //   let [currentTab] = await browser.tabs.query({
  //     active: true,
  //     currentWindow: true,
  //   });
  //   if (currentTab.id !== tabId) {
  //     throw new Error("The given tab ID is not the currently active tab");
  //   }
  // }

  return (
    <div>
      <button onClick={replace}>Replace everything</button>
    </div>
  );
}

export default Banana;
