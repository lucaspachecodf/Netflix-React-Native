import React, { useEffect, useState } from 'react'

import { StatusBar, Dimensions, Text } from 'react-native'

import LinearGradient from 'react-native-linear-gradient'

import styled from 'styled-components/native'

import Header from '../components/Header'
import Hero from '../components/Hero'
import Movies from '../components/Movies'

import { useSpring, animated } from 'react-spring'
import { getLocation, filtrarPorCidade } from '../services/MovieFilter'
import { ProfileContext } from '../context/ProfileContext'

const Container = styled.ScrollView`
	flex: 1;
	background-color: #000;
`

const Poster = styled.ImageBackground`
	width: 100%;
	height: ${(Dimensions.get('window').height * 81) / 100}px;
`

const Gradient = styled(LinearGradient)`
	height: 100%;
`
const PorterAnimado = animated(Poster)

const Home = () => {

	const [filmesRecomendados, setFilmesRecomendados] = useState([])
	const [filmesNacionais, setFilmesNacionais] = useState([])

	useEffect(() => {
		const carregarFilmes = async () => {
			const filmesJson = require('../assets/Movies.json')

			try {
				const position = await getLocation()

				const filtroCidadeNacional = await filtrarPorCidade(filmesJson, position)
				setFilmesNacionais(filtroCidadeNacional)

				const titulosNacionais = filtroCidadeNacional.map((item, index) => item.Title)

				const recomendados = filmesJson.filter((item, index) => {
					return !titulosNacionais.includes(item.Title)
				})

				setFilmesRecomendados(recomendados)
			}
			catch (error) {
				setFilmesRecomendados(filmesJson)
			}
		}
		carregarFilmes()
	}, []);


	const posterStyle = useSpring({
		config: { duration: 3000 },
		to: { opacity: 0 },
		from: { opacity: 1 }
	})

	const getResumeMovie = (user) => {
		const moviesJson = require('../assets/ContinuarAssistindo.json')
		return moviesJson[user]
	}

	return (
		<ProfileContext.Consumer>
			{(context) => (
				<>
					<StatusBar
						translucent
						backgroundColor='transparent'
						barStyle='light-content'
					/>
					<Container>
						<PorterAnimado source={require('../assets/poster.jpg')}>
							{/* <PorterAnimado style={posterStyle} source={require('../assets/poster.jpg')}> */}
							<Gradient
								locations={[0, 0.2, 0.6, 0.93]}
								colors={[
									'rgba(0,0,0,0.5)',
									'rgba(0,0,0,0.0)',
									'rgba(0,0,0,0.0)',
									'rgba(0,0,0,1)'
								]}>
								<Header />
								<Hero />
							</Gradient>
						</PorterAnimado>						
						{
							context.user && (
								<Movies label={`Continuar assistindo ${context.user}`} listaFilmes={getResumeMovie(context.user)} />
							)
						}
						<Movies label='Recomendados' listaFilmes={filmesRecomendados} />
						<Movies label='Nacionais' listaFilmes={filmesNacionais} />
						{/* {
							filmesNacionais.length > 0 && (<Movies label='Nacionais' listaFilmes={filmesNacionais} />)
						} */}
					</Container>
				</>
			)}
		</ProfileContext.Consumer>
	)
}

export default Home
