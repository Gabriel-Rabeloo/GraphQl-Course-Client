import P from 'prop-types';
import * as Styled from './styles';

export const Footer = () => {
  return (
    <Styled.Container>
      <div>
        <a
          href="https://github.com/Gabriel-Rabeloo/"
          rel="noopener noreferrer"
          title="Github"
          target="_blank"
        >
          <span>&lt;Dev&gt;</span>Gabriel Rabelo
          <span>&lt;/Dev&gt;</span>
        </a>
      </div>
    </Styled.Container>
  );
};

Footer.propTypes = {
  children: P.node,
};
