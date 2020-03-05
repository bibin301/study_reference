to check all check boxes
=====
	https://jsfiddle.net/52uny55w/

=========props handling====
import PropTypes from 'prop-types';
   static propTypes = {
        val: PropTypes.number.isRequired,
    }
    static defaultProps = {
        val: 4
    }
	stage-0
==========================


//checkbox select and uncheck

  private addSelectedItems = (item: any) => {
    let selectedItems = this.state.selectedItems;
    let currentItem = [item];
    if (_isEmpty(selectedItems)) {
      selectedItems.push(item);
      this.setState({ selectedItems: selectedItems });
    } else {
      let diff = _difference(currentItem, selectedItems);
      if (!_isEmpty(diff)) {
        selectedItems.push(item);
        this.setState({ selectedItems: selectedItems });
      } else {
        _remove(selectedItems, (each) => {
          return item === each;
        })
        this.setState({ selectedItems: selectedItems });
      }
    }

  }
  
  
  //passing props
  
  <GridCardContent addSelectedItems={this.addSelectedItems} />
  
  //gridCard Component
  
  interface props {
     addSelectedItems: (id: any) => void
  }
  
  
  //inside render get props
  
  const {addSelectedItems} = this.props
  
  return(
  //getting data from maping..
   <div className="c-row-card__toggle-wrapper" onClick={() => addSelectedItems(item.id)}>
              <CheckBox name={item.name} label=''
                checked={_includes(selectedItems, item.id)}
                onChange={_noop} />

              <div> <svg className="o-icon" width="20" height="19" viewBox="0 0 20 19" xmlns="http://www.w3.org/2000/svg" ><title>Risk</title><use xlinkHref={svgIcon}></use></svg></div>
            </div>
			)
			
			
			
//finding 
//making format
        [
	      {"id":36,"name":"test"},
		
	      {"id":37,"name":"new"}
		]


  const nameList = _map(selected, each => _find(this.props.adminDataList, {id: each})['name'])
  const listOfGroups = _map(selected, (each, i) => ({ id: each, userId: nameList[i]}))

  
  
 //assign object
   const childList = _compact(_map(this.props.allData, (each, i) => (_includes(this.state.availableSelection, each.name) && each)))
      const links = _map(childList, (each, i)=> {
        const Obj = _assign({}, each);
        Obj.type = 2; //to assign value manually inside object set
        Obj.children = [each];
        return Obj;
      })
	  
//Ternery with objject value format changing

 const finalList = dateFormat 
      ? _map(adminOverviewList, (each, i) => {
        const Obj = _assign({}, each);
        Obj.scenarioDate = moment(Obj.scenarioDate).format('ddd MMM DD HH:mm:ss ZZ YYYY'),
        Obj.executionTime = moment(Obj.executionTime).format('ddd MMM DD HH:mm:ss ZZ YYYY')
        return Obj;
      }) : adminOverviewList;
	  
	  
Difference b/w current and absolute path

The path with reference to root directory is called absolute. The path with reference to current directory is called relative.	  



----> to show condition based value in table

const updatedLogs = _includes(['USERACTION', 'APPLICATION'], logFor) 
    ? _map(logs, (each, i) => {
      console.log('tabInd...', each.tabIndex)
      const listObject = _find(MODULE_LIST, { value: each.tabIndex });
      each.tabIndex = listObject && listObject['label'];

      return each;
    }) : logs;
	
	
	
==========>
left table to right table (push,slice)

    public addScenarioList = () => {
        const { scenariosList } = this.state;
        const { user ,id ,userId ,availableLists ,availableOrgUnits ,orgUnits ,availablePerms} = this.props;
           
        addDetectionScenariosList(user, scenariosList ,0,id ,userId ,availableLists ,availableOrgUnits ,orgUnits ,availablePerms)
    }

    public getElements = (item: any) => {
        const { availableRule, scenariosList } = this.state;

        _remove(scenariosList, each => each === item);
        availableRule.push(item);
        this.setState({ scenariosList, availableRule })

    }

	
==================validation - SubmissionError===


private addRuleSubmit = (formValues) => {
        const { allDetectionList } = this.props;

        let ruleName;
         _map(allDetectionList, function (each) {

            if (each.ruleName === formValues.ruleName) {
               ruleName = 'already exists'
               return false;
            }

        })
        if(ruleName) {
            throw new SubmissionError({ ruleName })
        } else {
        const userDTO = _assign({}, formValues)

        this.setState({ ruleName: userDTO.ruleName, periodictyId: userDTO.periodicty })


        this.setState({ isPerRecord: true })
        }
    }
	
	
	 onChange={() => this.setState({ selected : each})}
                                                            checked={this./> 
	     <li>
                                                    <label className="mydeckCheck" > {each.Name}
                                                        <input type="checkbox"
                                                            onChange={() => this.handleCollectionSelect(each)}
                                                            checked={_includes(this.state.selected, each)} />
                                                        <span className="checkmark"></span>
                                                    </label>

                                                </li>
	  
================== fist field value reject
if (_includes(_difference(_map(allDetectionList, 'ruleName'), [modifyingRule.ruleName]), formValues.ruleName)) {
      ruleName = 'already exists';
    }
==select handling===

<select className="selectCreater">
                                <option value={''}></option>
                                {_map(itemList, (each, i) => (
                                    <option key={i} value={each.id}>{each.name}</option>)
                                )}</select>

								
								
====================logic====



 //console.log('opt...', options)
     const list = _map(options, each => ({
        userName: each.user ? each.user.username: 'null',
         address: each.address
     }))
     const username = _compact(_map(options, 'user.username'))
     const userAddress = _map(options,'address')
     const data = _concat(  username,userAddress)
	 
	 
	 <select className="selectCreater" name="itemCreator" onClick={(event) => this.handleChangeSelect(event)} >
                                        <option value={''}> type of select creator</option>
                                        {_map(itemChosen, (each, i) => (
                                            <option key={i} name="creater" value={each.address}>{each.name}  {each.seller_fee_basis_points}     </option>)
                                        )}
                                    </select> 
	 
===============check box handling==========
client ID : 711054291343-mnk8hhbdt0p3ud5tp46l5v6qtpg0se72.apps.googleusercontent.com
client secrit : 4cazO9RtPsZvNFSpzNQXQPr1


app flow

React app ->  (HTTP Request -Json)  Express/node  ->  Mango DB


Node:
javascript run time used to execute code outside of the browser

Express:
Library that runs in the node runtime. has helpers to make dealing with http traffic easier



heroku login

heroku create

git remote add heroku 

heroku open

https://floating-woodland-75265.herokuapp.com/

https://github.com/StephenGrider/WebpackProject.git - WebpackProject


http://localhost:5000/auth/google/callback -set if you get 400 error 

login : http://localhost:5000/auth/google


==node 
write a function to retrieve a blob of json

make an ajax request ! use the fetch function


https://rallycoding.herokuapp.com/api/music_albums

https://materializecss.com/ - for design

//ES5
function fetchAlbums() {
	
	fetch('https://rallycoding.herokuapp.com/api/music_albums')
	.then(res => res.json())
	.then(json => console.log(json));
	
}

fetchAlbums()



async function fetchAlbums(){
	const res = await fetch('https://rallycoding.herokuapp.com/api/music_albums');
	const json = await res.json();
	console.log(json)
}

https://stripe.com/docs/testing#cards - payment handling
==========methods============


 render(){
    return (
        <div className="container">
          <BrowserRouter>
          <div>
              <Header/>
              <Route exact path="/" component={Landing} />
              <Route path="/surveys" component={Dashboard} />
              <Route path="/surveys/new" component={SurveyNew} />
         </div>
          </BrowserRouter>
        </div>
    )
 }

  
};
