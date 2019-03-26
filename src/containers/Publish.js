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
    // console.log(files);
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
      " http://localhost:3100/api/offer/publish", // api locale
      {
        title: this.state.title,
        description: this.state.description,
        price: Number(this.state.price),
        files: this.state.files
      },
      {
        headers: {
          authorization: "Bearer " + this.props.getUser().token
        }
      }
    );
    if (response.data) {
      this.props.history.push(`/offer/${response.data._id}`);
    }
    console.log("response data :", response.data);
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
      <>
        <div
          className="container"
          style={{
            display: "flex",
            backgroundColor: "#666666",
            color: "white",
            fontWeight: "bold",
            marginTop: "30px",
            height: 45,
            paddingLeft: "20px",
            alignItems: "center"
          }}
        >
          Votre annonce
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            backgroundColor: "white",
            padding: "0 20px 30px 20px"
          }}
          className="container"
        >
          <form onSubmit={this.handleSubmit}>
            <div className="form-input-wrapper">
              <label className="input-label">Titre de l'annonce</label>
              <input
                className="form-input"
                type="text"
                name="title"
                value={this.state.title}
                onChange={this.handleChange}
              />
            </div>
            <div className="form-input-wrapper">
              <label className="input-label">Texte de l'annonce</label>
              <textarea
                className="form-input"
                name="description"
                cols="30"
                rows="10"
                value={this.state.description}
                onChange={this.handleChange}
              />
            </div>
            <div className="form-input-wrapper">
              <label className="input-label">Prix (€)</label>
              <input
                className="form-input"
                type="text"
                name="price"
                value={this.state.price}
                onChange={this.handleChange}
              />
            </div>
            <ReactFileReader
              fileTypes={[".png", ".jpg"]}
              base64={true}
              multipleFiles={true} // `false si une seule image`
              handleFiles={this.handleFiles}
            >
              <div className="img-btn">
                <i className="fas fa-camera" />
                <span>Choisir des images</span>
              </div>
            </ReactFileReader>
            {filesArray.length > 0
              ? filesArray.map((file, index) => {
                  const binaryData = file.props.src;
                  return (
                    <img
                      key={index}
                      className="img-publish"
                      src={binaryData}
                      alt=""
                    />
                  );
                })
              : ""}
            <div style={{ width: 200 }}>
              <input
                className="form-active-btn"
                type="submit"
                value="Publier"
              />
            </div>
          </form>
        </div>
      </>
    );
  }
}

export default Publish;
