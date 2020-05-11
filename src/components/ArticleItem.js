import React, { useState, useEffect, useCallback } from "react";

import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import Typography from "@material-ui/core/Typography";
import {parseArticle,refreshArticleComment} from "./utils/article"

export default function ArticleItem(props) {

	let item = props.item;
	let info = props.info;
	let BotContext = props.BotContext;

	const handleClick = async () => {
		// handle deleted article
		if(item.title.startsWith("(本文已被刪除)")) return;
		console.log("article item click:", info, item, BotContext);
		try {
			let t1 = performance.now();
			let articleContent = await parseArticle(item,BotContext);
			info.setIndex(1);
			info.setArticleContent(articleContent);
			let t2 = performance.now();
			console.log("articleContent load time",t2-t1);
		} catch(err) {
			console.log(err);
		}
	};

	return (
		<ListItem
			onClick={handleClick}
			button
			key={item.id}
			divider={true}
			style={{ height: "9vh" }}
		>
			<ListItem
				style={{ flexBasis: "15%", flexGrow: "0", flexShrink: "0" }}
			>
				<ListItemText
					primary={
						<Typography variant="body2">{item.push}</Typography>
					}
				/>
				{item.status === "R:" && (
					<ListItemText
						primary={<Typography variant="body2">RE:</Typography>}
						style={{ textAlign: "right" }}
					/>
				)}
			</ListItem>

			<ListItemText
				primary={<Typography variant="body1">{item.title}</Typography>}
				secondary={
					<Typography variant="body2">{item.author}</Typography>
				}
				style={{ flexBasis: "60%", flexGrow: "0", flexShrink: "0" }}
			/>
			<ListItemText
				primary={<Typography variant="body2">{item.date}</Typography>}
				secondary={
					<Typography variant="body2">id:{item.id}</Typography>
				}
			/>

			<ListItemIcon style={{ justifyContent: "center" }}>
				<ChevronRightIcon />
			</ListItemIcon>
		</ListItem>
	);
}
