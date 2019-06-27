import './home.scss';

import React from 'react';
import { Link } from 'react-router-dom';

import { connect } from 'react-redux';
import { Row, Col, Alert } from 'reactstrap';
import TravelCardItem from 'app/shared/layout/travelCard/travel-card-item';

import { IRootState } from 'app/shared/reducers';
import { getSession } from 'app/shared/reducers/authentication';

export interface IHomeProp extends StateProps, DispatchProps {}

export class Home extends React.Component<IHomeProp> {
  componentDidMount() {
    this.props.getSession();
  }

  render() {
    const { account } = this.props;
    console.log(this.props);
    return (
      <Row>
        <Col md="3">
          <div className="trendingDestination">
            <p className="text-center font-weight-bold"> Trending destinations</p>
            <div className="trendingDestinationList" />
          </div>
        </Col>
        <Col md="9">
          <section>
            <div className="container">
              <Row className="card-deck">
                {/*{userExtraEntity.travels.map((travel, i) => (
                  <TravelCardItem
                    key={i}
                    id={1101}
                    image="content/images/default-photo.png"
                    {/*
                      travel.steps[0] !== undefined
                        ? travel.steps[0].photos[0] !== undefined
                          ? travel.steps[0].photos[0].link
                          : 'content/images/default-photo.png'
                        : 'content/images/default-photo.png'
                    }
                    title="Mon premier voyage"
                    description="Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur."
                    fromProfile=false
                  />
                ))*/}
                <TravelCardItem
                  id={1101}
                  image="content/images/default-photo.png"
                  title="Mon premier voyage"
                  description="Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur."
                  fromProfile={false}
                />
                <TravelCardItem
                  id={11021}
                  image="content/images/default-photo.png"
                  title="Mon premier voyage"
                  description="Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur."
                  fromProfile={false}
                />
                <TravelCardItem
                  id={11201}
                  image="content/images/default-photo.png"
                  title="Mon premier voyage"
                  description="Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur."
                  fromProfile={false}
                />
                <TravelCardItem
                  id={11101}
                  image="content/images/default-photo.png"
                  title="Mon premier voyage"
                  description="Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur."
                  fromProfile={false}
                />
              </Row>
            </div>
          </section>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = storeState => ({
  account: storeState.authentication.account,
  isAuthenticated: storeState.authentication.isAuthenticated
});

const mapDispatchToProps = { getSession };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
