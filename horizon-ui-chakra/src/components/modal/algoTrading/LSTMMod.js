// import React from "react";
import {
  Box,
  Button,
  Flex,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  Heading,
  ModalFooter,
  Link,
  Text,
  ModalBody,
  ModalCloseButton,
  useColorModeValue,
} from "@chakra-ui/react";
import Card from "components/card/Card.js";
// import $ from 'jquery';
import React from "react";
import "../../../assets/css/LSTMStyles/style.css";
import $ from 'jquery';
import '../../../../src/assets/js/materialize.min.js'
import '../../../../src/assets/js/jquery-3.3.1.min.js'
import '../../../../src/assets/js/tf.js'
import '../../../../src/assets/d3.v3.min.js'
import '../../../../src/assets/d3.v3.min.js'
import '../../../../src/assets/numeric-1.2.6.min.js'
import '../../../../src/assets/numeric-1.2.6.min.js'
import '../../../../src/assets/numjs.min.js'
import '../../../../src/assets/utils.js'
import '../../../../src/assets/echarts.min.js'
import '../../../../src/assets/echarts-gl.min.js'
import '../../../../src/assets/papaparse.min.js'
import '../../../assets/data/google'
import "../../../assets/css/LSTMStyles/materialize.min.css"


function LSTMod() {
  return (
    <>
      <div className="row" style={{ paddingLeft: 10, paddingRight: 10 }}>
        <ul className="collapsible" data-collapsible="accordion">
          <li>
            <div className="collapsible-header">
              <i className="material-icons" style={{ fontSize: '3rem' }}>settings</i>
              <div className="row" style={{ marginBottom: 10, marginTop: 10 }}>
                <div className="col s3 m1">
                  Settings
                </div>
                <div className="input-field col s12 m1 right" style={{ marginTop: 5, width: 160 }}>
                  <button id="trainbutton" className="waves-effect waves-light btn red lighten-2">Train</button>
                </div>
                <div className="input-field col s12 m1 right" style={{ marginTop: 5, width: 160 }}>
                  <button id="suggestbutton" className="waves-effect waves-light btn blue lighten-2">Suggest</button>
                </div>
                <div className="file-field input-field col s12 m1 right" style={{ marginTop: 5, width: 160 }}>
                  <div className="btn blue lighten-2" style={{ height: 36, lineHeight: '2.5rem' }}>
                    <span>Pick CSV</span>
                    <input id="uploadcsv" type="file" />
                  </div>
                </div>
              </div>
            </div>
            <div className="collapsible-body"><span>
              <div className="row center">
                <div className="input-field col m2 offset-m1" style={{ marginLeft: '5.33%' }}>
                  Neural Network settings
                </div>
                <div className="input-field col s12 m1">
                  <input id="learningrate" type="number" placeholder="Eg: 0.001" className="validate tooltipped" data-position="bottom" data-delay="50" data-tooltip="learning rate during training" />
                  <label className="active">Learning rate</label>
                </div>
                <div className="input-field col s12 m1">
                  <input id="inputdropoutrate" type="number" placeholder="Eg: 0.9" className="validate tooltipped" data-position="bottom" data-delay="50" data-tooltip="dropout rate for LSTM input" />
                  <label className="active">Input dropout rate</label>
                </div>
                <div className="input-field col s12 m1">
                  <input id="outputdropoutrate" type="number" placeholder="Eg: 0.9" className="validate tooltipped" data-position="bottom" data-delay="50" data-tooltip="dropout rate for LSTM output" />
                  <label className="active">Output dropout rate</label>
                </div>
                <div className="input-field col s12 m1">
                  <input id="timestamp" type="number" className="validate tooltipped" placeholder="Eg: 5" data-position="bottom" data-delay="50" data-tooltip="Trends for every minibatch" />
                  <label className="active">Timestamp per training</label>
                </div>
                <div className="input-field col s12 m1">
                  <input id="sizelayer" type="number" className="validate tooltipped" placeholder="Eg: 64" data-position="bottom" data-delay="50" data-tooltip="LSTM size" />
                  <label className="active">Size layer</label>
                </div>
                <div className="input-field col s12 m1">
                  <input id="epoch" type="number" className="validate tooltipped" placeholder="Eg: 10" data-position="bottom" data-delay="50" data-tooltip="Total epoch" />
                  <label className="active">Training Iteration</label>
                </div>
                <div className="input-field col s12 m1">
                  <input id="future" type="number" className="validate tooltipped" placeholder="Eg: 10" data-position="bottom" data-delay="50" data-tooltip="number of days forecast" />
                  <label className="active">Future days to forecast</label>
                </div>
                <div className="input-field col s12 m1">
                  <input id="smooth" type="number" className="validate tooltipped" placeholder="Eg: 10" data-position="bottom" data-delay="50" data-tooltip="Rate anchor smoothing for trends" />
                  <label className="active">Smoothing weights</label>
                </div>
              </div>
              <div className="row center">
                <div className="input-field col m2 offset-m1" style={{ marginLeft: '5.33%' }}>
                  Buying & Selling simulation
                </div>
                <div className="input-field col s12 m2">
                  <input id="initialmoney" type="number" placeholder="Eg: 10000" className="validate tooltipped" data-position="bottom" data-delay="50" data-tooltip="Money in for simulation" />
                  <label className="active">Initial money(usd)</label>
                </div>
                <div className="input-field col s12 m2">
                  <input id="maxbuy" type="number" placeholder="Eg: 5" className="validate tooltipped" data-position="bottom" data-delay="50" data-tooltip="Max unit to buy" />
                  <label className="active">Max buy(unit)</label>
                </div>
                <div className="input-field col s12 m2">
                  <input id="maxsell" type="number" className="validate tooltipped" placeholder="Eg: 10" data-position="bottom" data-delay="50" data-tooltip="Max unit to sell" />
                  <label className="active">Max sell(unit)</label>
                </div>
                <div className="input-field col s12 m2">
                  <input id="history" type="number" className="validate tooltipped" placeholder="Eg: 5" data-position="bottom" data-delay="50" data-tooltip="MA to compare of" />
                  <label className="active">Historical rolling</label>
                </div>
              </div>
            </span></div>
          </li>
        </ul>
      </div>
      <h6 className='header center light'>WARNING, This website may hang during training, and do not use this website to buy real stock!<br /><br />Default stock is Google 2018, you can try upload any stock CSV</h6>
      <div className="row" style={{ paddingLeft: 10, paddingRight: 10 }}>
        <div className="col s12 m12">
          <div id="div_output" style={{ height: 500 }}></div>
        </div>
      </div>
      <br></br>
      <div className="row close-first" style={{ paddingLeft: 10, paddingRight: 10 }}>
        <div className="col s12 m8">
          <div id="div_dist" style={{ height: 450 }}></div>
        </div>
        <div className="col s12 m4">
          <div className="row">
            <div id="div_loss" style={{ height: 250 }}></div>
          </div>
          <div className="row" id="log" style={{ height: 150, overflow: 'auto' }}>
          </div>
        </div>
      </div>
      <div className="row" style={{ paddingLeft: 10, paddingRight: 10 }}>
        <ul className="collapsible" data-collapsible="accordion">
          <li>
            <div className="collapsible-header"><i className="material-icons">archive</i>Simulation log</div>
            <div className="collapsible-body"><span>
              <table className="bordered highlight">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Action</th>
                    <th>Price</th>
                    <th>Investment</th>
                    <th>Balance</th>
                  </tr>
                </thead>
                <tbody id='table-body'>
                </tbody>
              </table><br></br>
              <span id="log-invest"></span>
            </span></div>
          </li>
        </ul>
      </div>
      <div className="row center" id="color-investment"></div>
    </>
  );
}

export default function AppleModal(props) {
  const { fullForm } = props;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [size, setSize] = React.useState("md");
  const textColor = useColorModeValue("navy.700", "white");

  const handleSizeClick = (newSize) => {
    setSize(newSize);
    onOpen();
  };

  var __html = require("./stock-forecasting-js/Lstm.js");
  var template = { __html: __html };

  return (
    <>
      <Flex
        flexDirection="row"
        gridArea={{ xl: "1 / 1 / 2 / 3", "2xl": "1 / 1 / 2 / 2" }}
      >
        <Button
          onClick={() => handleSizeClick("full")}
          key={"full"}
          m={4}
        >
          visualize
        </Button>
      </Flex>

      <Modal onClose={onClose} size={size} isOpen={isOpen}>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody>
            <br />
            <Heading color={textColor} fontSize="36px">
              {fullForm}
            </Heading>
            {/* <span dangerouslySetInnerHTML={template} /> */}
            <LSTMod />

            <Box pt={{ base: "600px", md: "100px", xl: "100px" }}>
              <Card py="15px">
                <Flex
                  my="auto"
                  h="100%"
                  align={{ base: "center", xl: "start" }}
                  justify={{ base: "center", xl: "center" }}
                >
                  {/* from here */}
                  <Box py="15px">
                    <Flex
                      my="auto"
                      h="100%"
                      align={{
                        base: "center",
                        xl: "start",
                      }}
                      justify={{
                        base: "center",
                        xl: "center",
                      }}
                    ></Flex>
                  </Box>
                  {/* to here */}
                </Flex>
              </Card>
            </Box>
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}





// function LSTMod() {
//   return (
//     <div className="row" style={{ paddingLeft: 10, paddingRight: 10 }}>
//       <ul className="collapsible" data-collapsible="accordion">
//         <li>
//           <div className="collapsible-header">
//           <i className="material-icons" style={{fontSize:'3rem'}}>settings</i>
//           </div>
//         </li>
//       </ul>
//     </div>
//   );
// }

// export default LSTMod;
