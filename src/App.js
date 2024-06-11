import { useEffect, useRef, useState } from 'react'
import Selector from './001_shared/Selector/Selector'
import styles from './App.module.css'
import Input from './001_shared/Input/Input'
import Button from './001_shared/Button/Button'
import Checkbox from './001_shared/Checkbox/Checkbox'
import { Controller, useForm } from 'react-hook-form'
import Radiobutton from './001_shared/Radiobutton/Radiobutton'
import { useToast } from '@chakra-ui/react'
import { normalize_count_form } from './lib/normalizeCountForm.js'
import WebViewer from '@pdftron/webviewer'

function App() {
	const [select, setSelect] = useState(true)
	const [step, setStep] = useState(false)
	const [generating, setGenerating] = useState(false)
	const [data, setData] = useState(null)

	const [name, setName] = useState('')
	const [tel, setTel] = useState('')
	const [email, setEmail] = useState('')
	const toast = useToast()

	useEffect(() => {
		setGenerating(false)
	}, [select])

	return (
		<div className={styles.App}>
			{step ? (
				<>
					<nav className={styles.navbar}>
						<Selector select={select} setSelect={setSelect} />
						{select ? (
							<First setData={setData} setGenerating={setGenerating} />
						) : (
							<Second setData={setData} setGenerating={setGenerating} />
						)}
					</nav>
					<div className={styles.content}>
						{generating ? (
							<Viewer
								customerName={name}
								data={data}
								select={select}
								name={name}
								tel={tel}
								email={email}
								setGenerating={setGenerating}
							/>
						) : (
							<article className={styles.placeholder__block}>
								<div className={styles.placeholder__text}>
									Здесь появится сгенерированное
									<br />
									техническое задание
								</div>
							</article>
						)}
					</div>
				</>
			) : (
				<div className={styles.preview}>
					<Input
						title='Имя заказчика'
						value={name}
						onChange={e => {
							setName(e.target.value)
						}}
					/>
					<Input
						title='Контактный телефон заказчика'
						value={tel}
						onChange={e => {
							setTel(e.target.value)
						}}
					/>
					<Input
						title='Почта заказчика'
						value={email}
						onChange={e => {
							setEmail(e.target.value)
						}}
					/>
					<Button
						variant='primary'
						color='blue'
						width={'100%'}
						height={'52px'}
						text='Продолжить'
						onClick={() => {
							if (name.length === 0 || tel.length === 0 || email.length === 0) {
								toast({
									title: 'Внимание',
									description: 'Заполните все поля для продолжения',
									status: 'error',
									duration: 3000,
									isClosable: true,
								})
							} else {
								setStep(true)
							}
						}}
					/>
				</div>
			)}
		</div>
	)
}

const Viewer = ({
	customerName,
	data,
	select,
	name,
	tel,
	email,
	setGenerating,
}) => {
	const viewer = useRef(null)

	const getElements = obj => {
		if (obj === null) return ''

		const arr = Object.keys(obj).map((el, id) => {
			let value = Object.values(obj)[id]
			if (value !== false) {
				return el === 'Другое' ? value : el
			}
		})

		return arr
			.filter(el => {
				return el !== undefined
			})
			.map(el => {
				return { item: el }
			})
	}
	const getElementsFromString = str => {
		const arr = str.split(',')

		return arr.map(el => {
			let str = el.trim()
			return { item: str }
		})
	}
	const getFirstElement = obj => {
		if (obj === null) return ''

		return Object.keys(obj)[0] === 'Другое'
			? Object.values(obj)[0]
			: Object.keys(obj)[0]
	}

	const jsonData = select
		? {
				customerName: customerName,
				customerTel: tel,
				customerEmail: email,
				terms: data.deadlines,
				budget: data.budget,
				type: getFirstElement(data.type),
				targets: getElements(data.purposes),
				services: getElements(data.services),
				integrations: getElements(data.integrations),
				cms: getFirstElement(data.cms),
				adaptive: getFirstElement(data.adaptive),
				sections: getElementsFromString(data.sections),
				navigation: getElementsFromString(data.navigation),
				infoBlocks: getElementsFromString(data.infoBlocks),
				unAcceptableColors: getElementsFromString(data.unAcceptableColors),
				distinguish: getFirstElement(data.distinguish),
				animation: getFirstElement(data.animation),
				imageDev: getFirstElement(data.imageDev),
				bannerDev: getFirstElement(data.bannerDev),
				shape: getFirstElement(data.shape),
				style: getFirstElement(data.style),
				mood: getFirstElement(data.mood),
				photoDev: getFirstElement(data.photoDev),
				variantsCount: `${getFirstElement(
					data.variantsCount
				)} ${normalize_count_form(getFirstElement(data.variantsCount), [
					'версию',
					'версии',
					'версий',
				])}`,
				graphics: getElements(data.graphics),
				graphicSaturation: getFirstElement(data.graphicSaturation),
				webLike: getElementsFromString(data.webLike),
				webDislike: getElementsFromString(data.webDislike),
				elements: getElements(data.elements),
				requirements: data.requirements,
				content: getFirstElement(data.content),
				includes: getElements(data.includes),
				addInfo: data.addInfo,
		  }
		: {
				customerName: customerName,
				customerTel: tel,
				customerEmail: email,
				url: data.url,
				terms: data.terms,
				budget: data.budget,
				saveBlocks: getElementsFromString(data.saveBlocks),
				addBlocks: getElementsFromString(data.addBlocks),
				deleteBlocks: getElementsFromString(data.deleteBlocks),
				shape: getFirstElement(data.shape),
				style: getFirstElement(data.style),
				mood: getFirstElement(data.mood),
				unAcceptableColors: getElementsFromString(data.unAcceptableColors),
				imageDev: getFirstElement(data.imageDev),
				bannerDev: getFirstElement(data.bannerDev),
				photoDev: getFirstElement(data.photoDev),
				graphicSaturation: getFirstElement(data.graphicSaturation),
				distinguish: getFirstElement(data.distinguish),
				animation: getFirstElement(data.animation),
				variantsCount: `${getFirstElement(
					data.variantsCount
				)} ${normalize_count_form(getFirstElement(data.variantsCount), [
					'версий',
					'версия',
					'версии',
				])}`,
				graphics: getElements(data.graphics),
				webLike: getElementsFromString(data.webLike),
				webDislike: getElementsFromString(data.webDislike),
				elements: getElements(data.elements),
				requirements: data.requirements,
				content: getFirstElement(data.content),
				addInfo: data.addInfo,
		  }

	useEffect(() => {
		WebViewer(
			{
				path: 'lib',
				licenseKey:
					'demo:1715104608908:7ff638dd0300000000f9b8394910ec8a234970251c35d2cc7de8681efb',
				initialDoc: select
					? '/templates/template1.docx'
					: '/templates/template2.docx',
			},
			viewer.current
		).then(instance => {
			const { documentViewer } = instance.Core
			instance.UI.setLanguage('ru')

			documentViewer.addEventListener('documentLoaded', async () => {
				await documentViewer.getDocument().getDocumentCompletePromise()
				documentViewer.updateView()

				await documentViewer
					.getDocument()
					.applyTemplateValues(jsonData)
					.then(() => {})
			})
		})
	}, [])

	return (
		<div className={styles.viewer_block}>
			<div className={styles.webviewer} ref={viewer}></div>
			<Button
				text='Сбросить'
				color='grey'
				variant='secondary'
				height='52px'
				width='252px'
				onClick={() => {
					setGenerating(false)
				}}
			/>
		</div>
	)
}

const First = ({ setData, setGenerating }) => {
	const {
		handleSubmit,
		control,
		formState: { errors },
	} = useForm({
		defaultValues: {
			deadlines: '',
			budget: '',
			type: null,
			purposes: [],
			services: [],
			integrations: [],
			cms: null,
			adaptive: null,
			sections: '',
			navigation: '',
			infoBlocks: '',
			shape: null,
			style: null,
			mood: null,
			unAcceptableColors: '',
			imageDev: null,
			bannerDev: null,
			photoDev: null,
			graphics: [],
			graphicSaturation: null,
			distinguish: null,
			animation: null,
			variantsCount: null,
			webLike: '',
			webDislike: '',
			elements: [],
			requirements: '',
			content: null,
			includes: [],
			addInfo: '',
		},
	})

	const onSubmit = data => {
		setData(data)
		setGenerating(true)
	}
	return (
		<div className={styles.list}>
			<form className={styles.inputs_side} onSubmit={handleSubmit(onSubmit)}>
				<section>
					<h3 className={styles.navbar__title}>ОБЩИЕ ВОПРОСЫ</h3>
					<div className={styles.inputs}>
						<ControllerInput
							control={control}
							errors={errors}
							name='deadlines'
							title='Желаемые сроки разработки'
						/>
						<ControllerInput
							control={control}
							errors={errors}
							name='budget'
							title='Бюджет'
						/>
						<Radiobuttons
							title='Тип сайта'
							name='type'
							control={control}
							options={[
								'Корпоративный сайт',
								'Интернет-магазин',
								'Лендинг (одностраничный сайт)',
								'Сайт-визитка',
								'Персональный сайт',
							]}
						/>
						<Checkboxes
							title='Цели сайта'
							name='purposes'
							control={control}
							defaultValues={[]}
							options={[
								'Привлечение клиентов',
								'Повышение узнаваемости, улучшение имиджа',
								'Продажа товаров и услуг через интернет',
								'Информирование о проведении акций',
								'Информирование о товарах и услугах',
								'Информирование о компании',
								'Размещение новостей компании',
							]}
						/>
						<Checkboxes
							title='Сервисы для связи с посетителями сайта'
							name='services'
							control={control}
							defaultValues={[]}
							options={[
								'Форма обратной связи',
								'Форма обратный звонок',
								'Вопрос-ответ',
								'Голосования',
								'Отзывы',
								'Комментарии',
								'Онлайн-консультант',
								'Системы онлайн-бронирования',
								'Подписки и email рассылки',
								'Регистрация пользователей',
								'Личный кабинет',
							]}
						/>
						<Checkboxes
							title='Интеграции со сторонними сервисами и программами'
							name='integrations'
							control={control}
							defaultValues={[]}
							options={[
								'Импорт прайса из Excel',
								'Интеграция с 1С',
								'Интеграция с корпоративной базой данных',
								'Яндекс.Маркет',
								'Фарпост',
								'Другое',
							]}
						/>
						<Radiobuttons
							title='Система управления сайтом'
							name='cms'
							control={control}
							options={[
								'WordPress (бесплатная)',
								'OpenCart (бесплатная) ',
								'UMI.CMS (платная)',
								'Битрикс (платная)',
								'Другое',
							]}
						/>
						<Radiobuttons
							title='Нужна ли мобильная версия сайта или интересует адаптивный дизайн'
							name='adaptive'
							control={control}
							options={[
								'Нет',
								'Нужна мобильная версия сайта',
								'Адаптивный дизайн',
							]}
						/>
					</div>
				</section>
				<section>
					<h3 className={styles.navbar__title}>Структура сайта</h3>
					<div className={styles.inputs}>
						<ControllerInput
							control={control}
							errors={errors}
							name='sections'
							title='Разделы сайта (перечислите через запятую)'
						/>
						<ControllerInput
							control={control}
							errors={errors}
							name='navigation'
							title='Навигация по сайту (перечислите через запятую)'
						/>
						<ControllerInput
							control={control}
							errors={errors}
							name='infoBlocks'
							title='Информационные блоки (перечислите через запятую)'
						/>
					</div>
				</section>
				<section>
					<h3 className={styles.navbar__title}>Дизайн сайта</h3>
					<div className={styles.inputs}>
						<Radiobuttons
							name='shape'
							title='Формы блоков и элементов'
							control={control}
							options={[
								'Плоские',
								'Объемные',
								'Круглые',
								'На усмотрение дизайнера',
								'Другое',
							]}
						/>
						<Radiobuttons
							title='Выберите стилистику сайта'
							name='style'
							control={control}
							options={[
								'Консервативный',
								'Строгий',
								'Современный',
								'Абстрактный',
								'На усмотрение дизайнера ',
								'Другое',
							]}
						/>
						<Radiobuttons
							title='Настроение сайта'
							name='mood'
							control={control}
							options={[
								'Светлый',
								'Темный',
								'Яркий',
								'Умеренный',
								'На усмотрение дизайнера',
								'Другое',
							]}
						/>
						<ControllerInput
							control={control}
							errors={errors}
							name='unAcceptableColors'
							title='Неприемлемые цвета (перечислите через запятую)'
						/>
						<Radiobuttons
							control={control}
							name='imageDev'
							title='Необходима ли разработка картинок для слайдера'
							options={['Да', 'Нет']}
						/>
						<Radiobuttons
							control={control}
							name='bannerDev'
							title='Необходима ли разработка баннеров'
							options={['Да', 'Нет']}
						/>
						<Radiobuttons
							control={control}
							name='photoDev'
							title='Требуется ли разработка фотографий'
							options={['Да', 'Нет']}
						/>
						<Checkboxes
							title='Использование графики'
							name='graphics'
							control={control}
							defaultValues={[]}
							options={[
								'Графика не нужна',
								'Абстракции',
								'Люди',
								'Животные',
								'Растения',
								'Бытовые предметы',
								'Неживая природа (укажите примеры в Другое)',
								'Орнаменты',
								'Специфическая графика (предоставление материала обязательно)',
								'На усмотрение дизайнера',
								'Другое',
							]}
						/>
						<Radiobuttons
							title='Насыщенность графикой'
							name='graphicSaturation'
							control={control}
							options={[
								'Много графики',
								'Средняя',
								'Минимальная',
								'На усмотрение дизайнера ',
								'Другое',
							]}
						/>
						<Radiobuttons
							title='Различны ли главная и внутренняя страницы сайта'
							name='distinguish'
							control={control}
							options={[
								'Да, различны, поэтому необходимо изготовление дизайн-макета как главной, так и внутренней страниц сайта',
								'Нет, одинаковы, предполагается “сквозной” дизайн всех страниц, поэтому необходимо создание дизайна только для главной страницы',
								'Другое',
							]}
						/>
						<Radiobuttons
							title='Необходима ли флеш-анимация'
							name='animation'
							control={control}
							options={['Нет', 'Да', 'На усмотрение дизайнера']}
						/>
						<Radiobuttons
							title='Количество вариантов дизайна сайта'
							name='variantsCount'
							control={control}
							options={['1', '2', 'Другое']}
						/>
						<ControllerInput
							control={control}
							errors={errors}
							name='webLike'
							title='Примеры сайтов, дизайн которых вам нравится (перечислите через запятую)'
						/>
						<ControllerInput
							control={control}
							errors={errors}
							name='webDislike'
							title='Примеры сайтов, дизайн которых вам не нравится (перечислите через запятую)'
						/>
						<Checkboxes
							title='Какие элементы фирменного стиля у вас есть и могут быть использованы при разработке дизайна'
							name='elements'
							control={control}
							defaultValues={[]}
							options={[
								'Руководство по фирменному стилю',
								'Логотип',
								'Фирменные цвета',
								'Фирменные шрифты ',
								'Полиграфия',
								'Фотографиии',
								'Другое',
							]}
						/>
						<ControllerInput
							control={control}
							errors={errors}
							name='requirements'
							title='Основные требования и пожелания по дизайну проектов'
						/>
					</div>
				</section>
				<section>
					<h3 className={styles.navbar__title}>дополнительные вопросы</h3>
					<div className={styles.inputs}>
						<Radiobuttons
							title='Контент для сайта: тексты, изображения, фотографии'
							name='content'
							control={control}
							options={[
								'Уже готов',
								'Необходимы услуги копирайтера',
								'Необходимы услуги дизайнера',
								'Другое',
							]}
						/>
						<Checkboxes
							title='Наличие домена, хостинга, CMS'
							name='includes'
							control={control}
							defaultValues={[]}
							options={[
								'Все есть',
								'Нужен хостинг',
								'Нужен домен',
								'Нужна cms',
								'Другое',
							]}
						/>
						<ControllerInput
							control={control}
							errors={errors}
							name='addInfo'
							title='Дополнительная информация'
						/>
					</div>
				</section>
				<Button
					onClick={handleSubmit(onSubmit)}
					text='Сгенерировать техническое задание'
					width='100%'
					height='52px'
					color='blue'
					variant='primary'
				/>
			</form>
		</div>
	)
}

const Second = ({ setData, setGenerating }) => {
	const {
		handleSubmit,
		control,
		formState: { errors },
	} = useForm({
		defaultValues: {
			url: '',
			terms: '',
			budget: '',
			shape: null,
			style: null,
			mood: null,
			unAcceptableColors: '',
			imageDev: null,
			bannerDev: null,
			photoDev: null,
			graphics: [],
			graphicSaturation: null,
			distinguish: null,
			animation: null,
			variantsCount: null,
			webLike: '',
			webDislike: '',
			elements: [],
			requirements: '',
			saveBlocks: '',
			deleteBlocks: '',
			addBlocks: '',
			content: null,
		},
	})

	const onSubmit = data => {
		setData(data)
		setGenerating(true)
	}
	return (
		<div className={styles.list}>
			<form className={styles.inputs_side} onSubmit={handleSubmit(onSubmit)}>
				<section>
					<h3 className={styles.navbar__title}>ОБЩИЕ ВОПРОСЫ</h3>
					<div className={styles.inputs}>
						<ControllerInput
							control={control}
							errors={errors}
							name='url'
							title='Адрес сайта для которого необходим редизайн'
						/>
						<ControllerInput
							control={control}
							errors={errors}
							name='terms'
							title='Сроки редизайна'
						/>
						<ControllerInput
							control={control}
							errors={errors}
							name='budget'
							title='Бюджет'
						/>
					</div>
				</section>
				<section>
					<h3 className={styles.navbar__title}>Дизайн сайта</h3>
					<div className={styles.inputs}>
						<Radiobuttons
							name='shape'
							title='Формы блоков и элементов'
							control={control}
							options={[
								'Плоские',
								'Объемные',
								'Круглые',
								'На усмотрение дизайнера',
								'Другое',
							]}
						/>
						<Radiobuttons
							title='Выберите стилистику сайта'
							name='style'
							control={control}
							options={[
								'Консервативный',
								'Строгий',
								'Современный',
								'Абстрактный',
								'На усмотрение дизайнера ',
								'Другое',
							]}
						/>
						<Radiobuttons
							title='Настроение сайта'
							name='mood'
							control={control}
							options={[
								'Светлый',
								'Темный',
								'Яркий',
								'Умеренный',
								'На усмотрение дизайнера',
								'Другое',
							]}
						/>
						<ControllerInput
							control={control}
							errors={errors}
							name='unAcceptableColors'
							title='Неприемлемые цвета (перечислите через запятую)'
						/>
						<Radiobuttons
							control={control}
							name='imageDev'
							title='Необходима ли разработка картинок для слайдера'
							options={['Да', 'Нет']}
						/>
						<Radiobuttons
							control={control}
							name='bannerDev'
							title='Необходима ли разработка баннеров'
							options={['Да', 'Нет']}
						/>
						<Radiobuttons
							control={control}
							name='photoDev'
							title='Требуется ли разработка фотографий'
							options={['Да', 'Нет']}
						/>
						<Checkboxes
							title='Использование графики'
							name='graphics'
							control={control}
							defaultValues={[]}
							options={[
								'Графика не нужна',
								'Абстракции',
								'Люди',
								'Животные',
								'Растения',
								'Бытовые предметы',
								'Неживая природа (укажите примеры в Другое)',
								'Орнаменты',
								'Специфическая графика (предоставление материала обязательно)',
								'На усмотрение дизайнера',
								'Другое',
							]}
						/>
						<Radiobuttons
							title='Насыщенность графикой'
							name='graphicSaturation'
							control={control}
							options={[
								'Много графики',
								'Средняя',
								'Минимальная',
								'На усмотрение дизайнера ',
								'Другое',
							]}
						/>
						<Radiobuttons
							title='Различны ли главная и внутренняя страницы сайта'
							name='distinguish'
							control={control}
							options={[
								'Да, различны, поэтому необходимо изготовление дизайн-макета как главной, так и внутренней страниц сайта',
								'Нет, одинаковы, предполагается “сквозной” дизайн всех страниц, поэтому необходимо создание дизайна только для главной страницы',
								'Другое',
							]}
						/>
						<Radiobuttons
							title='Необходима ли флеш-анимация'
							name='animation'
							control={control}
							options={['Нет', 'Да', 'На усмотрение дизайнера']}
						/>
						<Radiobuttons
							title='Количество вариантов дизайна сайта'
							name='variantsCount'
							control={control}
							options={['1', '2', 'Другое']}
						/>
						<ControllerInput
							control={control}
							errors={errors}
							name='webLike'
							title='Примеры сайтов, дизайн которых вам нравится (перечислите через запятую)'
						/>
						<ControllerInput
							control={control}
							errors={errors}
							name='webDislike'
							title='Примеры сайтов, дизайн которых вам не нравится (перечислите через запятую)'
						/>
						<Checkboxes
							title='Какие элементы фирменного стиля у вас есть и могут быть использованы при разработке дизайна'
							name='elements'
							control={control}
							defaultValues={[]}
							options={[
								'Руководство по фирменному стилю',
								'Логотип',
								'Фирменные цвета',
								'Фирменные шрифты ',
								'Полиграфия',
								'Фотографиии',
								'Другое',
							]}
						/>
						<ControllerInput
							control={control}
							errors={errors}
							name='requirements'
							title='Основные требования и пожелания по дизайну проектов'
						/>
					</div>
				</section>
				<section>
					<h3 className={styles.navbar__title}>Структура сайта</h3>
					<div className={styles.inputs}>
						<ControllerInput
							control={control}
							errors={errors}
							name='saveBlocks'
							title='Разделы сайта, которые нужно оставить (перечислите через запятую)'
						/>
						<ControllerInput
							control={control}
							errors={errors}
							name='deleteBlocks'
							title='Разделы сайта, которые нужно убрать (перечислите через запятую)'
						/>
						<ControllerInput
							control={control}
							errors={errors}
							name='addBlocks'
							title='Разделы сайта, которые нужно добавить (перечислите через запятую)'
						/>
					</div>
				</section>
				<section>
					<h3 className={styles.navbar__title}>дополнительные вопросы</h3>
					<div className={styles.inputs}>
						<Radiobuttons
							title='Контент для сайта: тексты, изображения, фотографии'
							name='content'
							control={control}
							options={[
								'Уже готов',
								'Необходимы услуги копирайтера',
								'Необходимы услуги дизайнера',
								'Другое',
							]}
						/>
					</div>
				</section>
				<Button
					onClick={handleSubmit(onSubmit)}
					text='Сгенерировать техническое задание'
					width='100%'
					height='52px'
					color='blue'
					variant='primary'
				/>
			</form>
		</div>
	)
}

const ControllerInput = ({ control, errors, name, title }) => {
	return (
		<Controller
			control={control}
			rules={{
				required: {
					value: true,
					message: 'Введите данные',
				},
			}}
			render={({ field: { onChange, value } }) => (
				<Input
					title={title}
					onChange={onChange}
					value={value}
					error={errors[name] ? errors[name].message : false}
				/>
			)}
			name={name}
		/>
	)
}

const Checkboxes = ({ title, control, name, options }) => {
	const [checkedValues, setCheckedValues] = useState(
		options.reduce((obj, item) => {
			return { ...obj, [item]: false }
		}, {})
	)

	function handleSelect(checkedName) {
		const newNames = {
			...checkedValues,
			[checkedName]: !checkedValues[checkedName],
		}

		setCheckedValues(newNames)
		return newNames
	}

	return (
		<div className={styles.group}>
			<h4 className={styles.group_title}>{title}</h4>
			{options.map((item, key) => (
				<Controller
					key={key}
					name={name}
					render={({ field: { onChange } }) => {
						return (
							<>
								<Checkbox
									checked={checkedValues[item] !== false}
									onChange={() => onChange(handleSelect(item))}
									name={name}
									text={item}
								/>
								{checkedValues['Другое'] !== false && item === 'Другое' && (
									<Input
										value={
											checkedValues[item] === true ? '' : checkedValues[item]
										}
										onChange={e => {
											setCheckedValues(prev => {
												onChange({ ...prev, Другое: e.target.value })
												return { ...prev, Другое: e.target.value }
											})
										}}
									/>
								)}
							</>
						)
					}}
					control={control}
				/>
			))}
		</div>
	)
}

const Radiobuttons = ({ title, control, name, options }) => {
	const [checkedValues, setCheckedValues] = useState({})

	function handleSelect(checkedName) {
		const newNames = {
			[checkedName]: true,
		}

		setCheckedValues(newNames)
		return newNames
	}

	return (
		<div className={styles.group}>
			<h4 className={styles.group_title}>{title}</h4>
			{options.map((item, key) => (
				<Controller
					key={key}
					name={name}
					render={({ field: { onChange, value } }) => {
						return (
							<>
								<Radiobutton
									checked={Object.keys(checkedValues)?.includes(item)}
									onChange={() => onChange(handleSelect(item))}
									name={name}
									text={item}
								/>
								{Object.keys(checkedValues)?.includes(item) &&
									item === 'Другое' && (
										<Input
											value={
												checkedValues[item] === true ? '' : checkedValues[item]
											}
											onChange={e => {
												setCheckedValues(prev => {
													return { ...prev, Другое: e.target.value }
												})
												onChange({ Другое: e.target.value })
											}}
										/>
									)}
							</>
						)
					}}
					control={control}
				/>
			))}
		</div>
	)
}

export default App
