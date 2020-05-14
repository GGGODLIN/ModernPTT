import React, { useState, useEffect } from "react";
import { useArticleBoardInfoContext } from "./ArticleBoardInfoContext";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";

import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import { List, ListItem, ListItemText } from "@material-ui/core";
import SendComment from "./SendComment";

export default function ArticleDisplay(props) {
	const useStyles = makeStyles(theme => ({
		root: {
			alignItems: "center",
			maxHeight: "90vh",
			height: "90vh",
			overflow: "auto"
		},
		skeleton: {
			fontSize: "40px",
			width: "80%"
		},
		top: {
			height: "20vh",
			borderBottom: "1px solid rgba(0, 0, 0, 0.12)",
			marginTop: "12px",
			flexWrap: "nowrap",
			paddingLeft: "4vw"
		},
		goback: {
			width: "4vw",
			top: 0,
			position: "absolute",
			zIndex: 1001
		},
		info: {},
		titleText: {
			alignSelf: "center",
			flexBasis: "100%",
			flexGrow: "0",
			flexShrink: "0"
		},
		content: {
			paddingLeft: "4vw",
			paddingRight: "4vw",
			borderBottom: "2px solid rgba(0, 0, 0, 0.12)"
		},
		comment: {},
		author: {
			alignSelf: "center"
		},
		commentlist: {
			paddingTop: 0,
			width: "100%"
		},
		contentlist: {
			width: "100%"
		},
		commentlist_item: {
			paddingLeft: "4vw",
			paddingRight: "2vw"
		},
		commentlist_type: {
			flexBasis: "5%"
		},
		commentlist_author: {
			flexBasis: "20%"
		},
		commentlist_text: {
			flexBasis: "65%"
		},
		commentlist_timestamp: {
			flexBasis: "10%"
		},

		lit: {
			whiteSpace: "pre"
		}
	}));

	const info = useArticleBoardInfoContext();
	const article = info.article;
	const classes = useStyles();

	// Todo : 1. 排版會跑掉
	//		  2. 自動開圖
	//
	const genContentList = content => {
		if (content) {
			let res = content.map((item,index) => {
				return (
					<ListItem key={index} disableGutters={true} className={classes.lit}>
						<ListItemText primary={item} />
					</ListItem>
				);
			});

			return <List className={classes.contentlist}>{res}</List>;
		}
		return "";
	};

	const genCommentList = comment => {
		if (comment) {
			let res = comment.map(item => {
				return (
					<ListItem
						disableGutters={true}
						divider={true}
						className={classes.commentlist_item}
						key={item.floor}
					>
						{item.type ? (
							<ListItemText
								className={classes.commentlist_type}
								primary={item.type}
							/>
						) : (
							""
						)}
						{item.author ? (
							<ListItemText
								className={classes.commentlist_author}
								primary={item.author}
							/>
						) : (
							""
						)}

						<ListItemText
							className={classes.commentlist_text}
							primary={item.text}
						/>
						{item.timestamp ? (
							<ListItemText
								className={classes.commentlist_timestamp}
								primary={item.floor + "F"}
								secondary={item.timestamp}
							/>
						) : (
							""
						)}
					</ListItem>
				);
			});
			return <List className={classes.commentlist}>{res}</List>;
		}
		return "";
	};

	const ref = React.createRef();

	// go back to top when load new article
	useEffect(() => {
		if (info.index === 2) {
			ref.current.scrollTop = 0;
		}
	}, [info.index]);

	return (
		<Grid container ref={ref} component="main" className={classes.root}>
			<CssBaseline />
			{info.index ? (
				<IconButton
					onClick={e => {
						info.setIndex(info.articleSearchIterator ? 1 : 0);
					}}
					className={classes.goback}
				>
					<ChevronLeftIcon />
				</IconButton>
			) : (
				""
			)}
			<Grid container className={classes.top}>
				<Grid container className={classes.info}>
					<Typography className={classes.author} variant={"body1"}>
						{article.info.author}
					</Typography>

					<Typography variant={"h5"} className={classes.titleText}>
						{article.info.title}
					</Typography>

					<Typography className={classes.boardName} variant={"body2"}>
						{article.info.boardname}
					</Typography>
					<Typography className={classes.timestamp} variant={"body2"}>
						・{article.info.timestamp}
					</Typography>
					<Typography className={classes.ip} variant={"body2"}>
						・來自：{article.info.ip}
					</Typography>
				</Grid>
			</Grid>
			<Grid container className={classes.content}>
				{genContentList(article.content)}
			</Grid>

			<Grid container className={classes.comment}>
				{genCommentList(article.comment)}
			</Grid>

			<Grid container className={classes.sendComment}>
				<SendComment />
			</Grid>
		</Grid>
	);
}