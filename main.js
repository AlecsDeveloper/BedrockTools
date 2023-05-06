const { dialog } = require('electron').remote;
const nbt = require('nbtjs');

const openButton = document.getElementById('openButton');
const saveButton = document.getElementById('saveButton');
const filenameInput = document.getElementById('filename');
const tagValueInput = document.getElementById('tagValue');

let filename = '';

openButton.addEventListener('click', () => {
  // Abre un cuadro de diálogo para que el usuario seleccione un archivo NBT.
  console.error("xd");
  dialog.showOpenDialog({
    properties: ['openFile'],
    filters: [{ name: 'NBT Files', extensions: ['nbt'] }]
  }).then(result => {
    if (result.canceled) return;
    filename = result.filePaths[0];
    filenameInput.value = filename;
    // Lee el archivo NBT y muestra su valor en el campo de entrada.
    nbt.read(filename, (error, data) => {
      if (error) {
        console.error(error);
        return;
      }
      tagValueInput.value = data.payload.value;
    });
  });
});

saveButton.addEventListener('click', () => {
  if (!filename) return;
  const tag = {
    type: 'TAG_String',
    value: tagValueInput.value
  };
  const data = {
    type: 'TAG_Compound',
    value: {
      'value': tag
    }
  };
  // Escribe los datos en el archivo NBT.
  nbt.write(filename, data, (error) => {
    if (error) {
      console.error(error);
      return;
    }
    console.log('Archivo NBT guardado correctamente');
  });
});