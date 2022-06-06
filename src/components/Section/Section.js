import React from 'react';
import s from './Section.module.css';
import PropTypes from 'prop-types';

export const Section = ({ title, children }) => (
  <section className={s.section}>
    <h1 className={s.title}>{title}</h1>
    {children}
  </section>
);

Section.propTypes = {
  title: PropTypes.string,
};
