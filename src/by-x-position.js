import sketch from 'sketch'
// documentation: https://developer.sketchapp.com/reference/api/

export default function() {
  var document = sketch.getSelectedDocument();
  var selectedLayers = document.selectedLayers;

  if (selectedLayers.length < 2) {
    sketch.UI.message(`Please select the layers you want to sort, and try again`);
    return;
  }

  // Sort by X
  var sortedLayers = [...selectedLayers.layers].sort((l1, l2) => {
    
    if (l1.frame.x === l2.frame.x) {
      if (l1.frame.y > l2.frame.y) {
        return -1;
      } else {
        return 1;
      }
    } else if (l1.frame.x > l2.frame.x) {
      return -1;
    } else {
      return 1; 
    }
  });

  var availableIndexes = sortedLayers.map((l) => l.index).sort();

  for(var i = 0; i < sortedLayers.length ; i++){
    sortedLayers[i].index = availableIndexes[i];
  }

  sketch.UI.message(`Sorted ${sortedLayers.length} layers 👌`);
}
