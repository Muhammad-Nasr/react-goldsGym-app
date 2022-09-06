import React from 'react';
import { ScrollMenu} from 'react-horizontal-scrolling-menu';
import { Box} from '@mui/material';

import BodyPart from './BodyPart';

import LeftArrow from './LeftArrow';
import RightArrow from './RightArrow';
import ExerciseCard from '../exercises/ExerciseCard';



const HorizontalScrollbar = ({ data, bodyParts, bodyPart, setBodyPart}) =>{
  return (
  <ScrollMenu LeftArrow={LeftArrow} RightArrow={RightArrow}>
   {data.map((item) => (
    <Box
      key={item.id || item}
      itemId={item.id || item}
      title={item.id || item}
      m="0 40px"
    >
      {bodyParts ?
       <BodyPart 
        item={item} 
        bodyPart={bodyPart} 
        setBodyPart={setBodyPart}
        /> 
      :
      <ExerciseCard exercise={item} />}

    </Box>
   ))}
   </ScrollMenu>
  );
}
export default HorizontalScrollbar;