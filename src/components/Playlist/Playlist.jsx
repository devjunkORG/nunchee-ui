import React from 'react';

import { Grid, Column, Row } from '../Grid/Grid';
import Item from './Item';
import AddItem from './AddItem';

class Playlist extends React.Component {

    constructor() {
        super();
    }

    render() {
        return (
            <div className="ui playlist segments">
                <div className="ui segment">
                    <Grid>
                        <div className="three column row">
                            <div className="column">
                                <h4>{this.props.title}</h4>
                            </div>
                            <div className="column">
                                {this.props.subtitle}
                            </div>
                            <div className="right aligned column">
                                <i className="fa fa-sliders"></i>
                            </div>
                        </div>
                    </Grid>
                </div>
                <div className="ui content segment">
                    <Grid>
                        <Row>
                            <Item subtitle="Serie" thumb="http://oisa.tmsimg.com/assets/p35273_p_v8_ad.jpg?h=900&h=160">
                                The Big Bang Theory
                            </Item>
                            <AddItem />
                        </Row>
                    </Grid>
                </div>
            </div>
        );
    }

}

export default Playlist;
