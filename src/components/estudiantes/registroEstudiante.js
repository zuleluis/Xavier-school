import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DatosPersonales from './seccionesRegistro/datosPersonales';
import DatosPoderes from './seccionesRegistro/datosPoderes';

export default function ControlledAccordions() {
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <div>
      <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
        <AccordionSummary         
          expandIcon={<ExpandMoreIcon style={{fill: "white"}}/>}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
          sx={{backgroundColor: "#0A043C"}}
        >
          <Typography sx={{ width: '33%', flexShrink: 0, color:"white"}}>
            Datos personales
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <DatosPersonales/>
        </AccordionDetails>
      </Accordion>

      <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon style={{fill: "white"}}/>}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
          sx={{backgroundColor: "#0A043C"}}
        >
          <Typography sx={{ width: '33%', flexShrink: 0, color:"white"}}>
            Datos de superpoderes
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <DatosPoderes/>
        </AccordionDetails>
      </Accordion>

      
      <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon style={{fill: "white"}}/>}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
          sx={{backgroundColor: "#0A043C"}}
        >
          <Typography sx={{ width: '33%', flexShrink: 0, color:"white"}}>
           Registro de dormitorio
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Nunc vitae orci ultricies, auctor nunc in, volutpat nisl. Integer sit
            amet egestas eros, vitae egestas augue. Duis vel est augue.
          </Typography>
        </AccordionDetails>
      </Accordion>


      <Accordion expanded={expanded === 'panel4'} onChange={handleChange('panel4')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon style={{fill: "white"}}/>}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
          sx={{backgroundColor: "#0A043C"}}
        >
          <Typography sx={{ width: '33%', flexShrink: 0, color:"white"}}>
            Finalización del registro
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Nunc vitae orci ultricies, auctor nunc in, volutpat nisl. Integer sit
            amet egestas eros, vitae egestas augue. Duis vel est augue.
          </Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}