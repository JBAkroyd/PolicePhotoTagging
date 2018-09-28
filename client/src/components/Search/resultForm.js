import React, { Component } from "react";
import {
  FormControl,
  FormGroup,
  ControlLabel,
  Button,
  Modal,
  Well,
  Image
} from "react-bootstrap";
import { Link } from "react-router-dom";
import DateOnlyPicker from "../objects/dateOnlyPicker";
import TimeOnlyPicker from "../objects/timeOnlyPicker";
import Tagging from "../objects/tagging";
import "../results/results.css"
import Measure from "react-measure";
import Gallery from "react-photo-gallery";
import GoogleMapReact from "google-map-react";
import * as actions from "../../actions";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

const MAP_COMPONENT = ({ text }) => <div>{text}</div>;


class EachPicture extends Component {
  constructor(props, context) {
    super(props, context);
    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);

    this.state = {
      show: false,
      width: -1
    };
  }

  handleClose() {
    this.setState({ show: false });
  }

  handleShow() {
    this.setState({ show: true });
  }

  render() {

    // console.log(this.props.desciptor);
    return (
      <div>


        <img
          src={`data:image/jpeg;base64,${this.props.blob}`}
            onClick={this.handleShow}/>
      

        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Picture #1</Modal.Title>
          </Modal.Header>
          <Modal.Body>

            <Image
              src={`data:image/jpeg;base64,${this.props.blob}`}
              onClick={this.handleShow}
              thumbnail
            />
            <FormGroup disabled>
              <ControlLabel>Assocaited Tags</ControlLabel>
              <Tagging />
              <ControlLabel>QID</ControlLabel>
              <FormControl
                type="text"
                name="qid"
                value={this.props.desciptor.qid}
              />
              <ControlLabel>Date</ControlLabel>
              <DateOnlyPicker value={this.props.desciptor._datetime} />
              <ControlLabel>Time</ControlLabel>
              <TimeOnlyPicker />
              <ControlLabel>File Number</ControlLabel>
              <FormControl type="text" name="filenumber" />
              <ControlLabel>Offence</ControlLabel>
              <FormControl
                type="text"
                name="offence"
                value={this.props.desciptor.offence}
              />
            </FormGroup>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.handleClose}>Close</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

class ResultForm extends Component {
  constructor(props, context) {
    super(props, context);
    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);

    this.state = {
      show: false,
      width: -1
    };
  }



  static defaultProps = {
    center: {
      lat: 59.95,
      lng: 30.33
    },
    zoom: 11
  };

  handleClose() {
    this.setState({ show: false });
  }

  handleShow() {
    this.setState({ show: true });
  }

  render() {
    let images = Object.keys(this.props.search).map(image => {
      //  console.log(this.props.search[image].blob);
      return (
        <EachPicture
          blob={this.props.search[image].blob}
          desciptor={this.props.search[image]}
        />
      );
    });

    //console.log(this.props.search[0].blob);
    const width = this.state.width;
    return (
      <Measure
        bounds
        onResize={contentRect =>
          this.setState({ width: contentRect.bounds.width })
        }
      >
        {({ measureRef }) => {
          if (width < 1) {
            return <div ref={measureRef} />;
          }
          let columns = 1;
          if (width >= 480) {
            columns = 2;
          }
          if (width >= 1024) {
            columns = 4;
          }
          if (width >= 1824) {
            columns = 4;
          }
          return (
            <div>
              <div className="buttonGroup">
                <Link href="/search" to="/search">
                  <Button className="searchButton" bsStyle="primary">
                    Back
                  </Button>
                </Link>
              </div>


              {images}

            </div>
          );
        }}
      </Measure>
    );
  }
}

function mapStateToProps({ search }) {
  return { search };
}
export default connect(
  mapStateToProps,
  actions
)(ResultForm);
