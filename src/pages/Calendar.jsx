import React from 'react';
import { Box, Card, CardContent, Typography, Grid } from '@mui/material';
import cropCalendar from '../staticData/crop_calendar.json';
import { useTranslation } from 'react-i18next';

const Calendar = () => {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;

  return (
    <Box p={2}>
      <Typography variant="h4" gutterBottom>
        {lang === 'hi' ? 'फसल कैलेंडर' : 'Crop Calendar'}
      </Typography>
      <Grid container spacing={2}>
        {Object.entries(cropCalendar).map(([key, crop]) => (
          <Grid item xs={12} sm={6} md={4} key={key}>
            <Card>
              <CardContent>
                <Typography variant="h6">{crop.name[lang]}</Typography>
                <Typography><strong>{t('Sowing')}:</strong> {crop.sowing}</Typography>
                <Typography><strong>{t('Growing')}:</strong> {crop.growing}</Typography>
                <Typography><strong>{t('Harvesting')}:</strong> {crop.harvesting}</Typography>
                <Typography><strong>{t('Regions')}:</strong> {crop.region.join(', ')}</Typography>
                <Typography variant="body2" mt={1}>{crop.notes[lang]}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Calendar;
