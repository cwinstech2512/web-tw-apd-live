/* @flow */
import React from 'react';
import { useLinkTo, usePathSelector, useBreakPoint } from '@core/hooks';
import { withStyle } from '@core/container';
import Carousel from 'react-bootstrap/Carousel';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import ErrImg from '@src/dist/shared/gear/img-ele/preview.png';
import { ErrorMsgSm } from '@src/dist/shared/gear/error-block';
import { map, isEmpty } from 'ramda';
import styles from './carousel-bootstrap.scss';

const theme = {
  pc: {
    itemClass: 'carousel-pc-item',
    titleClass: 'pc-title',
    max: 58
  },
  mobile: {
    itemClass: 'carousel-item',
    titleClass: 'title',
    max: 18
  }
};

class RowGridView extends React.Component {
  constructor(props) {
    super(props);
    this.remote_url = props.remote_url
    this.logo_url = props.logo_url
    var lists = props.lists
    this.arr_list = []
    for(var i = 0; i < lists.length; i+=2) {
      this.arr_list.push(lists.slice(i, i+2))
    }
    // console.log(this.arr_list)
  }

  render() {
    function linkTo(s) {}
    var a = this.arr_list.map((item, index) => (
      <Row key={index}>
        <Col md={6} style={{display: `flex`}}>
          <div
            onClick={()=> window.open(item[0].remote_url, "_blank")}
            style={{display: `flex`, alignItems: `center`}}>
            <img 
              width="100%"
              src={item[0].logo_url || ErrImg} 
              alt={item[0].title}
              />
          </div>
        </Col>
        <Col md={6} style={{display: `flex`}}>
          { item[1] && 
          <div
            onClick={()=> window.open(item[1].remote_url, "_blank")}
            style={{display: `flex`, alignItems: `center`}}>
            <img 
              width="100%"
              src={item[1].logo_url || ErrImg} 
              alt={item[1].title}
              />
          </div>
          }
        </Col>
      </Row>
    ))
    return (
      <div>
        <Container>
          {a}
        </Container>
      </div>
    );
  }
}

export default withStyle(styles)(({ type = 'focus', showTitle = false }) => {
  const linkTo = useLinkTo();
  const deviceTheme = useBreakPoint();
  const posts = usePathSelector('wp-posts.posts', {});
  const idList = usePathSelector(`wp-posts.${type}`, []);

  if (isEmpty(posts) || isEmpty(idList))
    return (
      <div styleName="carousel">
        <ErrorMsgSm msg="尚無資料" />
      </div>
    );

  let list = [];
  if (!isEmpty(posts)) {
    if (isEmpty(idList)) return null;

    list = map(
      id => ({
        id,
        src: posts[id].previewImg,
        title: posts[id].title,
        remote_url: posts[id].ad_remote_url,
        logo_url: posts[id].ad_image_url,
      }),
      idList
    );
  }

  return (
    <div styleName="carousel" style={{marginTop: `2%`}}>
      <Container>
        <Row>
          <Col md={deviceTheme == 'pc'? 7 : 12}>
            <Carousel indicators={false} interval={20000}>
              {map(
                ({ id, src, title, remote_url}) => (
                  <Carousel.Item key={`carousel-item-${id}`}>
                    <div
                      styleName={theme[deviceTheme].itemClass}
                      onClick={()=> window.open(remote_url, "_blank")}>
                      <img
                        styleName="carousel-item-img"
                        alt={title}
                        src={src || ErrImg}
                      />
                    </div>
                    {showTitle && (
                      <div
                        styleName={theme[deviceTheme].titleClass}
                        onClick={linkTo(`/article/${id}`)}>
                        {title.length >= theme[deviceTheme].max
                          ? `${title.substr(0, theme[deviceTheme].max)}..`
                          : title}
                      </div>
                    )}
                  </Carousel.Item>
                ),
                list
              )}
            </Carousel>
          </Col>
          {deviceTheme == 'pc' && <Col md={5}>
            <RowGridView remote_url={2} lists={list}></RowGridView>
          </Col>}
        </Row>
      </Container>
    </div>
  );
});
