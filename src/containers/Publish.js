import React from "react";
import ReactFileReader from "react-file-reader";
import axios from "axios";

class Publish extends React.Component {
  state = {
    title: "",
    description: "",
    price: 0,
    files: []
  };

  handleFiles = files => {
    console.log(files);
    const newFiles = [...this.state.files, ...files.base64];
    this.setState({
      files: newFiles
    });
  };

  handleChange = event => {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    const newState = {};
    newState[name] = value;

    this.setState(newState);
  };

  handleSubmit = async event => {
    event.preventDefault();

    const response = await axios.post(
      "https://leboncoin-copycat.herokuapp.com/publish",
      {
        title: this.state.title,
        description: this.state.description,
        price: Number(this.state.price),
        file: this.state.files[0]
      },
      {
        headers: {
          authorization: "Bearer " + this.props.getUser().token
        }
      }
    );
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
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            name="title"
            value={this.state.title}
            onChange={this.handleChange}
          />
          <input
            type="text"
            name="description"
            value={this.state.description}
            onChange={this.handleChange}
          />
          <input
            type="number"
            name="price"
            value={this.state.price}
            onChange={this.handleChange}
          />

          <ReactFileReader
            fileTypes={[".png", ".jpg"]}
            base64={true}
            multipleFiles={true} // `false si une seule image`
            handleFiles={this.handleFiles}
          >
            <span>Choisir des images</span>
          </ReactFileReader>

          {filesArray}
          <button
            onClick={async () => {
              const response = await axios.post(
                "https://leboncoin-copycat.herokuapp.com/publish",
                {
                  file: this.state.files[0]
                },
                {
                  headers: {
                    authorization: "Bearer " + this.props.getUser().token
                  }
                }
              );

              console.log(response.data);
            }}
          >
            Send file
          </button>

          <input type="submit" value="Publier" />
        </form>
      </div>
    );
  }
}

export default Publish;
