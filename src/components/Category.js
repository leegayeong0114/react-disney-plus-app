import React from 'react'
import { styled } from 'styled-components'

const Category = () => {

  const categorys = [
    {
      name: 'disney',
      img: '/images/viewers-disney.png',
      video: '/videos/disney.mp4'
    },
    {
      name: 'marvel',
      img: '/images/viewers-marvel.png',
      video: '/videos/marvel.mp4'
    },
    {
      name: 'pixar',
      img: '/images/viewers-pixar.png',
      video: '/videos/pixar.mp4'
    },
    {
      name: 'star-wars',
      img: '/images/viewers-starwars.png',
      video: '/videos/star-wars.mp4'
    },
    {
      name: 'national-geographic',
      img: '/images/viewers-national.png',
      video: '/videos/national-geographic.mp4'
    },
  ]

  return (
    <Container>
      {
        categorys.map((category, i) => (
          <Wrap key={i}>
            <img src={`${category.img}`} alt={`${category.name}`} />
            <video autoPlay loop muted>
              <source src={`${category.video}`} type="video/mp4" />
            </video>
          </Wrap>
        ))
      }
    </Container>
  )
}

export default Category

const Container = styled.div`
  margin-top: 30px;
  padding: 30px 0px 26px;
  display: grid;
  gap: 25px;
  grid-template-columns: repeat(5, 1fr);
  @media (max-width: 768px) {
    grid-template-columns: repeat(1, 1fr);
  }
`
const Wrap = styled.div`
  padding-top: 56.25%;
  border-radius: 10px;
  box-shadow: rgb(0 0 0 / 69%) 0px 26px 30px -10px,
              rgb(0 0 0 /73%) 0px 16px 10px -10px;
  cursor: pointer;
  overflow: hidden;
  position: relative;
  border: 3px solid rgba(249, 249, 249, 0.1);
  transition: all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s; // 스타일 변경시 부드럽게 전환

  img {
    inset: 0px;
    display: block;
    height: 100%;
    object-fit: cover;
    opacity: 1;
    position: absolute;
    transition: opacity 500ms ease-in-out 0s;
    width: 100%;
    z-index: 1;
  }

  video {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    opacity: 0;
    z-index: 0;
  }

  &:hover {
    box-shadow: rgb(0 0 0 /80%) 0px 40px 58px -16px,
                rgb(0 0 0 /72%) 0px 30px 22px -10px;
    transform: scale(1.05);
    border-color: rgba(249, 249, 249, 0.8);
    video {
      opacity: 1;
    }
  }
`