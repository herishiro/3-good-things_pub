import { Card, Container, IconButton } from "@material-ui/core";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import PageTitle from "components/gadget/internalPages/PageTitle";
import { EmojiTarouDisplay } from "components/modules/aboutPage/EmojiTarouDisplay";
import Image from "next/image";
import Head from "next/head";
import React from "react";
import SimpleLink from "components/modules/externalPages/formSection/SimpleLink";
import Navigation from "components/gadget/internalPages/NavigationWrapper";
import Link from "next/link";
import { selectAuthState } from "context/slices/user";
import { useSelector } from "react-redux";
import { BottomLinkNavigation } from "components/modules/externalPages/BottomLinkNavigation";
import { faTwitter, faGithub } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import router from "next/router";

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			position: "relative",
			paddingBottom: 120,
		},
		container: {
			position: "relative",
		},
		base: {
			backgroundColor: "#fff",
			height: "100%",
		},
		cardWrap: {
			[`&:not(:first-child)`]: {
				marginTop: 30,
			},
		},
		card: {
			position: "relative",
			"box-shadow": "none",
			backgroundColor: theme.palette.primary.light,
			borderRadius: 7,
		},
		contentWrapper: {
			margin: "auto",
			padding: "30px 0",
			width: "85%",
			maxWidth: 450,
			lineHeight: "200%",
			color: theme.palette.grey[800],
			[`& a`]: {
				color: theme.palette.grey[800],
			},
		},
		howtoWrap: {
			marginTop: 30,
		},
		image: {
			width: "90%",
			margin: "auto",
			marginTop: 20,
			border: "2px solid #fff",
			[theme.breakpoints.up("sm")]: {
				width: "70%",
			},
		},
		sectionTitle: {
			fontWeight: "bold",
			fontSize: "18px",
			textAlign: "center",
			marginTop: 5,
			textDecoration: "underline",
		},
		subTitle: {
			marginTop: 40,
			fontSize: theme.typography.pxToRem(14),
			textAlign: "center",
		},
		subText: {
			marginTop: 10,
			fontSize: theme.typography.pxToRem(12),
			textAlign: "center",
			color: theme.palette.grey[700],
			lineHeight: "200%",
		},
		header: {
			marginTop: 20,
			fontWeight: "bold",
			color: theme.palette.grey[800],
		},
		text: {
			marginTop: 10,
			[`& a`]: {
				color: theme.palette.grey[800],
			},
		},
		asterisk: {
			color: theme.palette.primary.main,
		},
		note: {
			marginTop: 20,
			fontSize: "0.7em",
			lineHeight: "180%",
		},
		inPageNavi: {
			display: "flex",
			justifyContent: "space-around",
			marginTop: 30,
		},
		inPageNaviItem: {
			border: "2px solid #fff",
			flexBasis: "45%",
			textAlign: "center",
			[`& a`]: {
				textDecoration: "none",
				display: "block",
				color: theme.palette.grey[800],
			},
		},
		iconBox: {
			display: "flex",
			flexDirection: "column",
			[theme.breakpoints.up("sm")]: {
				flexDirection: "row",
			},
		},
	})
);

export default function AboutPage() {
	const classes = useStyles();
	const authState = useSelector(selectAuthState);

	return (
		<div className={classes.root} id="about-page">
			<Head>
				<title>{"このアプリについて" + "| 3 good things!"}</title>
				<meta charSet="utf-8" />
				<meta name="viewport" content="initial-scale=1.0, width=device-width" />
			</Head>
			<Container maxWidth="sm" className={classes.container}>
				<div className={classes.cardWrap}>
					<PageTitle title="3 GOOD THINGS!" />
					<Card className={classes.card}>
						<div className={classes.contentWrapper}>
							<div>
								『3 Good Things!』は
								<br />
								ポジティブ心理学<span className={classes.asterisk}>*</span>
								の創設者セリグマン教授が提唱し、長年の実験で効果が実証されている
								“Three Good
								Things”メソッドを使い、毎晩5分の習慣で考え方をポジティブに変えていくためのアプリです。
							</div>
							<div className={classes.note}>
								<span className={classes.asterisk}>*</span>
								ポジティブ心理学とは、健康な人も含めて精神的に安定したより良い生活(well-being)を送る方法について心理学的なアプローチから研究する心理学の一分野です。本当にある研究分野だよ、あやしくないよ！
								<br />
								<a href="https://www.jppanetwork.org/what-is-positivepsychology">
									ポジティブ心理学とは - 一般社団法人日本ポジティブ心理学協会
								</a>
							</div>
							<div className={classes.inPageNavi}>
								<div className={classes.inPageNaviItem}>
									<a href="/about#reference">参考文献</a>
								</div>
								<div className={classes.inPageNaviItem}>
									<a href="/about#this-app">アプリ情報</a>
								</div>
							</div>
						</div>
					</Card>
				</div>
				<div className={classes.cardWrap}>
					<PageTitle title="HOW TO USE" />
					<Card className={classes.card}>
						<div className={classes.contentWrapper}>
							<div>
								やり方は簡単！今日あった良かったこと3つをアプリに記録するだけです。
								<br />
								なお就寝前に行うことで効果が高まるという研究結果が出ているのでおやすみ前の使用をおすすめします。
							</div>
							<div className={classes.subTitle}>使用法チュートリアル</div>
							<div className={classes.sectionTitle}>
								emoji太郎、今日良かったことは？
							</div>
							<div className={classes.howtoWrap}>
								<EmojiTarouDisplay
									emoji="😞"
									text="今日何も良いこと無かった気がする…"
								/>
								<div className={classes.image}>
									<Image
										src="/images/howtouse1.png"
										alt="操作説明1"
										width={1242}
										height={2208}
										layout="responsive"
									/>
								</div>
							</div>
							<div className={classes.howtoWrap}>
								<EmojiTarouDisplay
									emoji="🧐"
									text="幸せも色々あるんだな…うーん"
								/>
								<div className={classes.image}>
									<Image
										src="/images/howtouse2-0.png"
										alt="操作説明2"
										width={1242}
										height={1401}
										layout="responsive"
									/>
								</div>
							</div>
							<div className={classes.howtoWrap}>
								<EmojiTarouDisplay
									emoji="😋"
									text="あっそう言えばお昼美味しかったな！"
								/>
								<div className={classes.image}>
									<Image
										src="/images/howtouse2.png"
										alt="操作説明2"
										width={1242}
										height={1401}
										layout="responsive"
									/>
								</div>
							</div>
							<div className={classes.howtoWrap}>
								<EmojiTarouDisplay
									emoji="🍛"
									text="食堂のカレーが美味しかった、っと…"
								/>
								<div className={classes.image}>
									<Image
										src="/images/howtouse3.png"
										alt="操作説明3"
										width={1242}
										height={1336}
										layout="responsive"
									/>
								</div>
							</div>
							<div className={classes.howtoWrap}>
								<EmojiTarouDisplay
									emoji="🤔"
									text="次は、ラッキーな事とかあったかな？"
								/>
								<div className={classes.image}>
									<Image
										src="/images/howtouse4.png"
										alt="操作説明4"
										width={1242}
										height={1198}
										layout="responsive"
									/>
								</div>
							</div>
							<div className={classes.howtoWrap}>
								<EmojiTarouDisplay
									emoji="😊"
									text="あっそういえば朝電車で座れたな"
								/>
								<div className={classes.image}>
									<Image
										src="/images/howtouse5.png"
										alt="操作説明5"
										width={1242}
										height={1825}
										layout="responsive"
									/>
								</div>
							</div>
							<div className={classes.howtoWrap}>
								<EmojiTarouDisplay
									emoji="😳"
									text="お風呂に入った、だけでも良いの！？"
								/>
								<div className={classes.subText}>いいんだよ</div>
								<div className={classes.image}>
									<Image
										src="/images/howtouse6.png"
										alt="操作説明6"
										width={1242}
										height={1484}
										layout="responsive"
									/>
								</div>
							</div>
							<div className={classes.howtoWrap}>
								<EmojiTarouDisplay
									emoji="💯"
									text="わーい！今日も3つ良いことあった"
								/>
							</div>
							<div className={classes.howtoWrap}>
								<EmojiTarouDisplay
									emoji="😙"
									text="なんだかんだ毎日良いことあるな♪"
								/>
								<div className={classes.image}>
									<Image
										src="/images/howtouse7.png"
										alt="操作説明7"
										width={1242}
										height={2208}
										layout="responsive"
									/>
								</div>
							</div>
							<div className={classes.howtoWrap}>
								<EmojiTarouDisplay emoji="😴" text="ではおやすみなさい〜" />
								<div className={classes.subText}>
									おやすみemoji太郎、
									<br />
									明日はも〜っと良い日になると良いね
								</div>
							</div>
							<div style={{ marginTop: 40 }}>
								なお最低１週間で効果が出て、2〜3週間の継続で効果が定着すると言われています。
								<br />
								正式なやり方では良かったことの詳細を入力をすることを推奨していますが、続けることが大事なので、書きたいときだけ書けばOKです👌
							</div>
						</div>
					</Card>
				</div>
				<div className={classes.cardWrap} id="reference">
					<PageTitle title="REFERENCE" />
					<Card className={classes.card}>
						<div className={classes.contentWrapper}>
							<div className={classes.header}>着想元</div>
							<ul>
								<li>
									<a href="https://www.youtube.com/watch?v=WPPPFqsECz0">
										An Antidote to Dissatisfaction (by Kurzgesagt – In a
										Nutshell )
									</a>
									<div className={classes.text}>
										日本語字幕もある、下記の論文を元にした分かりやすい動画です
									</div>
								</li>
							</ul>
							<div className={classes.header}>実践手順参考</div>
							<ul>
								<li>
									<a href="https://ggia.berkeley.edu/practice/three-good-things">
										Three Good Things - A way to tune into the positive events
										in your life. (by Greater Good in Action)
									</a>
								</li>
							</ul>
							<div className={classes.header}>参考文献</div>
							<ul>
								<li>
									<a href="https://ggsc.berkeley.edu/images/uploads/GGSC-JTF_White_Paper-Gratitude-FINAL.pdf">
										The Science of Gratitude (2018)
									</a>
								</li>
								<li>
									<a href="https://www.researchgate.net/publication/313845439_%27The_Three_Good_Things%27_-_The_effects_of_gratitude_practice_on_wellbeing_A_randomised_controlled_trial">
										'The Three Good Things' – The effects of gratitude practice
										on wellbeing: A randomised controlled trial (2017)
									</a>
								</li>
								<li>
									<a href="https://www.cambridge.org/core/journals/spanish-journal-of-psychology/article/abs/effects-of-counting-blessings-on-subjective-wellbeing-a-gratitude-intervention-in-a-spanish-sample/33A5D1DD01AD62CAE7B4E296A9C9EFC4">
										The Effects of Counting Blessings on Subjective Well-Being:
										A Gratitude Intervention in a Spanish Sample (2013)
									</a>
								</li>
								<li>
									<a href="https://greatergood.berkeley.edu/pdfs/GratitudePDFs/6Emmons-BlessingsBurdens.pdf">
										Counting Blessings Versus Burdens: An Experimental
										Investigation of Gratitude and Subjective Well-Being in
										Daily Life (2003)
									</a>
								</li>
							</ul>
						</div>
					</Card>
				</div>
				<div className={classes.cardWrap} id="this-app">
					<PageTitle title="ABOUT THIS APP" />
					<Card className={classes.card}>
						<div className={classes.contentWrapper}>
							<div className={classes.header}>
								<Link href="/privacypolicy">
									<a>プライバシーポリシーはこちら</a>
								</Link>
							</div>
							<div className={classes.header}>作成者について</div>
							<div
								style={{
									display: "flex",
									justifyContent: "space-between",
									alignItems: "center",
								}}
							>
								<div className={classes.text}>
									名前：tama 　健康のオタク(転職活動中)
								</div>
								<div className={classes.iconBox}>
									<IconButton
										onClick={() => router.push("https://twitter.com/herishiro")}
									>
										<FontAwesomeIcon icon={faTwitter} color="#000" size="lg" />
									</IconButton>
									<IconButton
										onClick={() => router.push("https://github.com/herishiro")}
									>
										<FontAwesomeIcon icon={faGithub} color="#000" size="lg" />
									</IconButton>
								</div>
							</div>
							<div className={classes.header}>連絡先</div>
							上記のSNSからでもいいですが、アプリに関することは出来ればこちらからお願いします。
							<br />
							<ul>
								<li>
									<a href="mailto:contact@3-good-things.app">
										contact@3-good-things.app
									</a>
								</li>
								<li>
									<a href="https://twitter.com/hd_3goodthings">
										アプリのTwitterアカウント
									</a>
								</li>
							</ul>
						</div>
					</Card>
				</div>
				<div style={{ marginTop: 30 }}>
					<SimpleLink label="TOPに戻る" destination="/" />
				</div>
			</Container>
			{!authState ? <BottomLinkNavigation /> : <Navigation />}
		</div>
	);
}
