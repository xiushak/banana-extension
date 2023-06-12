(() => {
  function replaceText(node) {
    if (node.nodeType === Node.TEXT_NODE) {
      let text = node.textContent;
      if (!text) return;
      text = text.replace(/banana/gi, "🍌");
      const regex = /\b((\S)[\w|']*)\b/gm;
      const words = text.match(regex);
      if (words) {
        words.forEach((word) => {
          var newWord = "b";
          for (var i = 1; i < word.length; i++) {
            if (i % 2 === 0) newWord += "n";
            else newWord += "a";
          }
          text = text.replace(word, newWord);
        });
      }
      node.textContent = text;
    } else {
      node.childNodes.forEach(replaceText);
    }
  }

  // Start the recursion from the body tag.
  replaceText(document.body);

  // Now monitor the DOM for additions and substitute emoji into new nodes.
  // @see https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver.
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.addedNodes && mutation.addedNodes.length > 0) {
        // This DOM change was new nodes being added. Run our substitution
        // algorithm on each newly added node.
        for (let i = 0; i < mutation.addedNodes.length; i++) {
          const newNode = mutation.addedNodes[i];
          replaceText(newNode);
        }
      }
    });
  });
  observer.observe(document.body, {
    childList: true,
    subtree: true,
  });
})();
