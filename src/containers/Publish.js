import React from "react";
import ReactFileReader from "react-file-reader";

class Publish extends React.Component {
  state = {
    files: []
  };

  handleFiles = files => {
    console.log(files);
    const newFiles = [...this.state.files, ...files.base64];
    this.setState({
      files: newFiles
    });
  };

  render() {
    const filesArray = [];
    for (let i = 0; i < this.state.files.length; i++) {
      filesArray.push(
        <img
          key={i}
          onClick={() => {
            // En cliquant sur l'image, le fichier sera supprimé
            const newFiles = [...this.state.files];
            newFiles.splice(i, 1);
            this.setState({ files: newFiles });
          }}
          src={this.state.files[i]}
          alt="Annonce"
        />
      );
    }

    return (
      <div>
        <ReactFileReader
          fileTypes={[".png", ".jpg"]}
          base64={true}
          multipleFiles={true} // `false si une seule image`
          handleFiles={this.handleFiles}
        >
          <span>Choisir des images</span>
        </ReactFileReader>

        {filesArray}
      </div>
    );
  }
}

export default Publish;
