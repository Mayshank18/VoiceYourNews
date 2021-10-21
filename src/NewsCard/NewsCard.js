import React,{useState,useEffect,createRef} from 'react'

import { Card, CardMedia, CardActions, CardActionArea, CardContent, Button, Typography, Box } from '@material-ui/core'
import useStyles from './style'
import classnames from 'classnames'

const NewsCard = ({article:{description, publishedAt, source, title, url, urlToImage},i,activeArticle}) => {
    const classes=useStyles();
    const [elRefs,setElRefs]=useState([]);

    const scrollToRef=(ref)=>window.scroll(0,ref.current.offsetTop-20);

    useEffect(()=>{
        setElRefs((refs)=> Array(20).fill().map((_ ,j)=> refs[j] || createRef()));
    },[]);

    useEffect(()=>{
        if(i===activeArticle && elRefs[activeArticle]){
            scrollToRef(elRefs[activeArticle]);
        }
    },[i,activeArticle,elRefs])

    return (
        <Card ref={elRefs[i]} className={classnames(classes.card,activeArticle===i?classes.activeCard:null)}>
            <CardActionArea href={url} target="_blank">
                <CardMedia className={classes.imagecon} image={urlToImage || 'https://www.industry.gov.au/sites/default/files/styles/news_teaser/public/August%202018/image/news-placeholder-738.png?itok=lRooeimK'}/>
                <Box className={classes.details}>
                    <Typography variant="body2" color="textSecondary" component="h4">{(new Date(publishedAt)).toDateString()}</Typography>
                    <Typography variant="body2" color="textSecondary" component="h4">{source.name}</Typography>
                </Box>
                <Typography className={classes.title} gutterBottom variant="h6">{title}</Typography>
                <CardContent>
                    <Typography variant="body2" color="textSecondary" component="p">{description}</Typography>
                </CardContent>
            </CardActionArea>
            <CardActions className={classes.cardActions}>
                <Button size="small" color="primary">Learn More</Button>
                <Typography variant="h5" color="textSecondary">{i+1}</Typography>
            </CardActions>
        </Card>
    )
}

export default NewsCard
