import * as React from 'react';
import PropTypes from 'prop-types';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';

function Title(props) {
  return (
    <Link href={props.href} style={{ textDecoration: 'none' }}>
      <Typography component="h2" variant="h6" color="primary" gutterBottom>
        {props.children}
      </Typography>
    </Link>

  );
}

Title.propTypes = {
  children: PropTypes.node,
};

export default Title;