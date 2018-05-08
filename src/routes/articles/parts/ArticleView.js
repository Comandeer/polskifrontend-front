import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from './ArticleView.styl';
import ResponsivePanel from '../../../components/Responsive/ResponsivePanel';
import Link from '../../../components/Link/Link';
import dateFormat from 'dateformat';
import Loader from '../../../components/Indicators/Loader';

const ArticleView = (props) => {
  return (
    <div>
      <Loader isLoading={props.isLoading}>
        <ResponsivePanel className={styles.container}
                         header={props.blogName}
                         description=""
                         image={props.blogIcon}
                         showImage
                         href={props.blogHref}
        >
          <div className={styles.nav}>
            <Link className={styles.back} to="/">
              <i className="icon-left-big">
              </i>
              Strona główna
            </Link>
          </div>
          <div className={styles.item}>
            <h2 className={styles['item__header']}>
              <a href={props.href} target="_blank" rel="nofollow" title={props.title}>{props.title}</a>
            </h2>
            <div className={styles['meta']}>
              <p className={styles['meta__date']}>
                {dateFormat(props.date, 'dd-mm-yyyy')}
              </p>
              <pre className={styles['meta__message']}>
                {props.description}
              </pre>
            </div>
            <div className={styles.more}>
              <h3 className={styles['more__header']}>Chcesz więcej? Przeczytaj w oryginale!</h3>
              <a className={styles['more__link']} href={props.href} target="_blank" rel="nofollow" title={props.title}>
                <i className="icon-link-ext-alt">
                </i>
                Przejdź do artykułu
              </a>
            </div>
          </div>
        </ResponsivePanel>
      </Loader>
    </div>
  );
};

ArticleView.propTypes = {
  blogHref: PropTypes.string.isRequired,
  blogIcon: PropTypes.string.isRequired,
  blogName: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  href: PropTypes.string.isRequired,
  isLoading: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired
};

export default withStyles(styles)(ArticleView);
