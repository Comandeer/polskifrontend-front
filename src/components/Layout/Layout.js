import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import style from './Layout.styl';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import TopHomePanel from './TopHomePanel';
import TopHomeLinks from './TopHomeLinks';
import CookieInfo from '../Cookie/CookieInfo';
import * as settingsHelper from '../../core/helpers/settingsHelper';
import { connect } from 'react-redux';
import mapPublicStateToProps from '../../core/redux/mapPublicStateToProps';
import mapPublicDispatchToProps from '../../core/redux/mapPublicDispatchToProps';
import _ from 'lodash';
import * as dateHelper from '../../core/helpers/dateHelper';

class Layout extends React.Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    newsList: PropTypes.array,
    newsState: PropTypes.object.isRequired
  };

  render() {
    const lastNewsVisit = settingsHelper.getSettings().lastNewsVisit;
    const lastVisitDate = new Date(lastNewsVisit);
    const { newsState: { newsList } } = this.props;
    const filteredList = _.filter(newsList, item => {
      const newsDate = new Date(item.date);
      return newsDate > lastVisitDate && dateHelper.isThisWeek(newsDate);
    });

    return (
      <div className={style.container}>
        <div className={style.pusher}>
        </div>
        <Header />
        <TopHomeLinks newNewsCount={filteredList.length} />
        <TopHomePanel />
        {this.props.children}
        <Footer />
        <CookieInfo />
      </div>
    );
  }
}

export default connect(mapPublicStateToProps, mapPublicDispatchToProps)(withStyles(style)(Layout));
