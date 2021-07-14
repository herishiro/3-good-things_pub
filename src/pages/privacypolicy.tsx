import { Card, Container } from "@material-ui/core";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import PageTitle from "components/gadget/internalPages/PageTitle";
import Head from "next/head";
import React from "react";
import SimpleLink from "components/modules/externalPages/formSection/SimpleLink";
import Navigation from "components/gadget/internalPages/NavigationWrapper";
import { selectAuthState } from "context/slices/user";
import { useSelector } from "react-redux";
import { BottomLinkNavigation } from "components/modules/externalPages/BottomLinkNavigation";

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			position: "relative",
			paddingBottom: 100,
		},
		container: {
			position: "relative",
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
	})
);

export default function PrivacyPolicyPage() {
	const classes = useStyles();
	const authState = useSelector(selectAuthState);

	return (
		<div className={classes.root} id="about-page">
			<Head>
				<title>{"プライバシーポリシー" + "| 3 good things!"}</title>
				<meta charSet="utf-8" />
				<meta name="viewport" content="initial-scale=1.0, width=device-width" />
			</Head>
			<Container maxWidth="sm" className={classes.container}>
				<div className={classes.cardWrap}>
					<PageTitle title="PRIVACY POLICY" />
					<Card className={classes.card}>
						<div className={classes.contentWrapper}>
							<div className={classes.header}>1. はじめに</div>
							<div className={classes.text}>
								本アプリ「3 Good things!」は開発者tamaが運営しています。
								<br />
								当方は以下の方針に基づいて本アプリに登録・入力されたデータを取り扱います。
							</div>
							<div className={classes.header}>2. 収集する情報</div>
							<div className={classes.text}>2-1. ログイン情報</div>
							<div className={classes.text}>
								メールアドレス・パスワードでアカウント登録された場合はその２つを、Googleアカウント認証で登録された場合はメールアドレスとGoogleアカウントに登録したアイコン・ユーザー名を取得し、ユーザー情報の管理に使用しています。
							</div>
							<div className={classes.text}>
								2-2. アプリケーションの利用状況の収集
							</div>
							<div className={classes.text}>
								当方が配信するアプリでは、利用状況解析のためにGoogle Firebase
								Analyticsを使用する場合がございます。
							</div>
							<div className={classes.text}>
								取得する情報、利用目的、第三者への提供等の詳細につきましては、以下のプライバシーポリシーのリンクよりご確認ください。
							</div>
							<div className={classes.text}>
								<a href="https://policies.google.com/privacy?hl=ja">
									Firebase Analytics（Google Inc.）
								</a>
							</div>
							<div className={classes.text}>
								2-3. お問い合わせやご意見を頂く際の個人情報の収集
							</div>
							<div className={classes.text}>
								お問い合わせいただいたメールアドレスと、お問い合わせ内容。
							</div>
							<div className={classes.header}>利用目的</div>
							<div className={classes.text}>
								当方は、2-2を本アプリの品質向上のために利用いたします。
							</div>
							<div className={classes.text}>
								また2-3において収集した情報を、お問い合わせに対する返信のために利用いたします。
							</div>
							<div className={classes.header}>4. 個人情報の管理</div>
							<div className={classes.text}>
								当方は、お客さまの個人情報を正確かつ最新の状態に保ち、個人情報への不正アクセス・紛失・破損・改ざん・漏洩などを防止するため、安全対策を実施し個人情報の厳重な管理を行ないます。
							</div>
							<div className={classes.header}>
								5. 個人情報の第三者への開示・提供の禁止
							</div>
							<div className={classes.text}>
								当方は、お客さまよりお預かりした個人情報を適切に管理し、次のいずれかに該当する場合を除き、個人情報を第三者に開示いたしません。
							</div>
							<div className={classes.text}>
								• お客さまの同意がある場合
								<br />
								•法令に基づき開示することが必要である場合
							</div>
							<div className={classes.text}>
								また、本人確認が困難なため、パスワード・メールアドレス紛失時の個別のお問い合わせにもご対応しかねます。
							</div>
							<div className={classes.header}>6. 免責事項</div>
							<div className={classes.text}>
								本アプリがユーザーの特定の目的に適合すること、期待する機能・商品的価値・正確性・有用性を有すること、および不具合が生じないことについて、何ら保証するものではありません。
								<br />
								当方の都合によりアプリの仕様を変更できます。私たちは、本アプリの提供の終了、変更、または利用不能、本アプリの利用によるデータの消失または機械の故障もしくは損傷、その他本アプリに関してユーザーが被った損害につき、賠償する責任を一切負わないものとします。
							</div>
							<div className={classes.header}>7. 著作権・知的財産権等</div>
							<div className={classes.text}>
								著作権その他一切の権利は、当方又は権利を有する第三者に帰属します。
							</div>
							<div className={classes.header}>8. 連絡先</div>
							<div className={classes.text}>contact@3-good-things.app</div>
							<div className={classes.header}>制定日</div>
							<div className={classes.text}>2021年6月18日</div>
						</div>
					</Card>
				</div>
				<div style={{ marginTop: 30 }}>
					<SimpleLink label="ABOUTに戻る" destination="/about" />
				</div>
			</Container>
			{!authState ? <BottomLinkNavigation /> : <Navigation />}
		</div>
	);
}
