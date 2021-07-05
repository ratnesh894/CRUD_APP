import React  from 'react';
import {inputFormElements} from './formElement';
import { Grid, TextField, Button, Card, CardContent, Typography } from '@material-ui/core';
function ContactUs(){

    return(
        <div>
          <Typography gutterBottom variant="h3" align="center">
        Contact Us
       </Typography>
       <Grid>
       <Card style={{ maxWidth: 450, padding: "20px 5px", margin: "0 auto" }}>
   <CardContent>
            <Typography gutterBottom variant="h5">
            Contact Us
          </Typography> 
          <form>
         
          <Grid container spacing={1}>
          {
                        inputFormElements.slice(3, 10).map(input => <Grid xs={input.xs} sm={input.sm} item>
                            <TextField {...input}  />
                            </Grid>)
                    }
                    </Grid>
                    <Grid item xs={12}>
                  <Button type="submit" variant="contained" color="primary" fullWidth>Submit</Button>
                </Grid>
          </form>
          </CardContent>
          </Card>
       </Grid>
        </div>
    )
}
export default ContactUs;