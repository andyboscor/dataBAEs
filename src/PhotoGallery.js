import React, {Component} from 'react';
import {Tabs, Tab} from 'material-ui/Tabs';

class PhotoGallery extends Component {


  render() {
    return (

        <div>
        <Tabs>
        <Tab label="Blog" value="a">
          <div>

          </div>
        </Tab>
        <Tab label="Profile" value="b">
          <div>

          </div>
        </Tab>
        <Tab label="Photo Albums" value="c" >
          <div>

          </div>
        </Tab>

        <Tab label="Messaging" value="d" >
          <div>

          </div>
        </Tab>
 </Tabs>

        </div>

    );
  }
}

export default PhotoGallery;
