import React, { Component } from 'react';

class MultipleImageUploadComponent extends Component {

    fileObj = [];
    fileArray = [];

    constructor(props) {
        super(props)
        this.state = {
            file: [null],
        }
        this.handleToUpdate = this.props.handleToUpdate;
        this.uploadMultipleFiles = this.uploadMultipleFiles.bind(this)
        this.uploadFiles = this.uploadFiles.bind(this)
    }

    uploadMultipleFiles(e) {
        this.fileObj.push(e.target.files)
        
        this.fileArray=[]
            this.fileObj.map((obj)=>{
                this.fileArray.push(URL.createObjectURL(obj[0]));
            })
           
        console.log(this.fileArray);
        this.setState({ file: this.fileArray });
    }

    uploadFiles(e) {
        e.preventDefault();
        this.handleToUpdate(this.state.file);
        console.log(this.state.file)
    }

    render() {
        
        return (
            <form>
                <div className="form-group multi-preview">
                    {(this.fileArray || []).map(url => (
                        <img key={url}src={url} alt="..."  width="20%"/>
                    ))}
                </div>

                <div className="form-group">
                    <input type="file" className="form-control" onChange={this.uploadMultipleFiles} multiple />
                </div>
                <button type="button" className="btn btn-danger btn-block" onClick={this.uploadFiles}>Upload</button>
            </form >
        )
    }
}

export default MultipleImageUploadComponent;
