import React, { useEffect, useState } from 'react';
import DateForm from './DateForm';
import NasaAdapter from './NasaAdapter';
import DateContainer from './DateContainer';
import { Switch, Route, withRouter } from 'react-router-dom'

const App = props =>  {

  const [ availableImages, setAvailableImages ] = useState([])
  const [ formShowing, setFormShowing ] = useState(true)

  useEffect(() => NasaAdapter.fetchAvailableImages(setAvailableImages), [])

  const setBirthday = ({ month, day }) => { 
    setFormShowing(false)
    props.history.push(["", month, day].join("/")) 
  }

  const renderDateContainer = renderProps => <DateContainer date={ renderProps.match.params } 
                                                            availableImages={ availableImages }
                                                            setFormShowing={ setFormShowing } />

  return (<>
      <DateForm setDate={ setBirthday } show={ formShowing } />
      <Switch> 
        <Route path="/" exact /> 
        <Route path="/:month/:day" render={ renderDateContainer } /> 
        <Route render={ () => "Nothing to see here!" } /> 
      </Switch>
    </>
  );
}

export default withRouter(App);
