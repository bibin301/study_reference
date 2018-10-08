import * as React from 'react'
import { reduxForm, Field, InjectedFormProps } from 'redux-form';
import {
  compact as _compact,
  assign as _assign,
  includes as _includes,
  map as _map,
  difference as _difference,
  isEqual as _isEqual
} from 'lodash';
import * as moment from 'moment';

import { formatMessage } from './../../../common/translation/Translate';
import { saveAdminOrgUnit } from './../../../service/admin/action';
import checkBoxGrp from './../../../components/checkBoxGrp/CheckBoxGrp'
import CheckBoxGrp from './../../../components/checkBoxGrp/CheckBoxGrp';

const tabName = {
  GENERAL: 'general',
  HISTORY: 'history'
}

interface IntProps {
  related: string,
  user: any,
  allData: any,
  activeData: any,
  history: any[],
  onHide: () => any
}

interface IntState {
  activeTab: string,
  selected: any,
  parents: any,
  isCheckbox: boolean,
  availableSelection: any
}

class EditOrgUnit extends React.Component<InjectedFormProps<any, IntProps> & IntProps, IntState> {
  state = {
    activeTab: tabName.GENERAL,
    // selected: _map(this.props.activeData.children, 'name'),
    // parents: _map(this.props.activeData.parents, 'name'),
    selected: _map(this.props.activeData.children, 'name'),
    parents: _map(this.props.activeData.parents, 'name'),
    availableSelection: [],
    isCheckbox: true
  }

  componentDidMount() {
    this.handleFormInitialValues();
  }

  private handleFormInitialValues = () => {
    const { activeData } = this.props;
    this.props.initialize({
      name: activeData.name,
      description: activeData.description,
      code: activeData.code,
      associatedCurrency: activeData.associatedCurrency,
      associatedBIC: activeData.associatedBIC,
    });
  }

  private editOrgUnitSubmit = (formValues) => {

    const { user, activeData } = this.props;
    const orgUnit = _assign({}, activeData, formValues)
    saveAdminOrgUnit(orgUnit, user);
    this.props.onHide();
  }

  private changeTab = (event: any) => {
    this.setState({ activeTab: event.target.name });
  }

  private renderContent = () => {
    const { activeTab } = this.state;

    switch (activeTab) {
      case tabName.GENERAL:
        return (
          <div className="c-modal__body">
            <div className="c-form__field ">
              <label className="o-label c-form__label">
                Organization Unit Name
                </label>
              <Field
                name='name'
                type="input"
                component="input"
                placeholder="Group Name"
                className="o-input c-form__input" />
            </div>
            <div className="c-form__field ">
              <label className="o-label c-form__label">
                Description
                </label>
              <Field
                name='description'
                type="input"
                placeholder="Description"
                component="textarea"
                className="o-input c-form__input" />
            </div>
            <div className="c-form__field ">
              <label className="o-label c-form__label">
                Code
                </label>
              <Field
                name='code'
                placeholder="Code"
                type="input"
                component="input"
                className="o-input c-form__input" />
            </div>
            <div className="c-form__field ">
              <label className="o-label c-form__label">
                Currency-Base
                </label>
              <Field
                name='associatedCurrency'
                placeholder="Currency-Base"
                type="input"
                component="input"
                className="o-input c-form__input" />
            </div>
            <div className="c-form__field ">
              <label className="o-label c-form__label" >
                BIC
                </label>
              <Field
                name='associatedBIC'
                placeholder="BIC"
                type="input"
                component="input"
                className="o-input c-form__input" />
            </div>
          </div>
        );

      case tabName.HISTORY:
        return (<React.Fragment>
          {_map(this.props.history, (each, key) => (
            <div className='rp-space' key={key}>
              <div className="u-well">
                <div className='rp-font'>
                  {each.userName} <span className='rp-sp'> {' '}  {' '} </span>
                  {moment(each.auditTimestamp).format('DD-MM-YYYY hh:mm:ss a')}
                </div>
                <div className='rp-font-comment'>
                  {each.auditComment}
                </div>
              </div>
            </div>)
          )}
        </React.Fragment>);
    }
  }

  private renderEdit = () => {
    const { handleSubmit, submitting } = this.props;
    const { activeTab, selected, isCheckbox, parents } = this.state;

    return (
      <React.Fragment>
        <div className="c-modal__head">
          <legend className="c-modal__title">
            New Organization Unit
          </legend>
        </div>
        <div className="c-modal__body">
          <div className="c-tabs js-tabs">
            <nav className="c-tabs__nav">
              <ul className="c-tabs__list">
                <li className="c-tabs__title">
                  <button className={`c-tabs__link u-text-medium js-tabs-link ${activeTab === tabName.GENERAL && 'is-active'}`}
                    name={tabName.GENERAL} onClick={this.changeTab}>
                    {formatMessage('admin.general')}
                  </button>
                </li>
                <li className="c-tabs__title">
                  <button className={`c-tabs__link u-text-medium js-tabs-link ${activeTab === tabName.HISTORY && 'is-active'}`}
                    name={tabName.HISTORY} onClick={this.changeTab}>
                    {formatMessage('admin.history')}
                  </button>
                </li>
              </ul>
            </nav>
            <form onSubmit={handleSubmit(this.editOrgUnitSubmit)}>
              <div className="c-tabs__content" style={{ minHeight: '400px', overflowY: 'auto' }}>
                <div className="c-tabs__item js-tabs-content is-active">
                  <div className="c-modal__body">
                    {this.renderContent()}
                  </div>
                </div>
              </div>
              <div className="c-modal__foot">
                <div className="c-modal__actions c-modal__actions--secondary">
                  <button className="o-btn u-accent-color" type="button" onClick={this.props.onHide}>
                    {formatMessage('global.cancel')}
                  </button>
                </div>
                <div className="c-modal__actions">
                  <button className="o-btn o-btn--primary" disabled={submitting} type="submit">
                    {formatMessage('global.apply')}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </React.Fragment>
    );
  }

  private editOrganizationSubmit = (releated) => {

    if (releated == 'children') {
      

      const { user, activeData } = this.props;
      const links = _compact(_map(this.props.allData, (each, i) => (_includes(this.state.availableSelection, each.name) && each)))

   
      // const filterData = Object.assign({}, this.props.activeData, { links })
      const filterData = Object.assign({}, this.props.activeData, { links })


      const data = filterData.links.children.push(filterData)


      console.log("childrens data", data);

      const orgUnit = _assign({},activeData, filterData);
      console.log("jcvbjchvjon unit " , orgUnit)

      saveAdminOrgUnit(orgUnit, user);

      this.props.onHide();
    } else if (releated == 'parents') {

      const { user, activeData } = this.props;

      const links = _compact(_map(this.props.allData, (each, i) => (_includes(this.state.availableSelection, each.name) && each)))
      //const filterData = Object.assign({}, this.props.activeData, { parents })
      const filterData = Object.assign({}, this.props.activeData, { links })

      const orgUnit = _assign({}, activeData, filterData);

      saveAdminOrgUnit(orgUnit, user);
      this.props.onHide();
    }

  }


  private handleSelection = (available, value) => {
    let availableSelection = available;

    this.setState({ availableSelection: availableSelection })

    if (availableSelection) {
      _includes(availableSelection, value)
        ? availableSelection = _difference(availableSelection, [value])
        : availableSelection.push(value)
    } else {
      availableSelection = [value];
    }
    return availableSelection;
  }

  private onCheck = (e) => {
    this.setState({ selected: this.handleSelection(this.state.selected, e.target.value) })
  }

  private onChecked = (e) => {
    this.setState({ parents: this.handleSelection(this.state.parents, e.target.value) })
  }

  private renderRelated = () => {
    const { related, handleSubmit, submitting, activeData, allData } = this.props;
    const { isCheckbox, selected } = this.state

    return (
      <React.Fragment>
        <div className="c-modal__head">
          <legend className="c-modal__title">

            Related: Organization Unit - {related.toUpperCase()}
          </legend>
        </div>
        <div className="c-modal__body" style={{ minHeight: '200px', overflowY: 'auto' }}>
          {
            related == 'children' &&
            <form onSubmit={handleSubmit(() => this.editOrganizationSubmit(related))}>
              <CheckBoxGrp
                checkList={allData}
                asName='name'
                asLabel='name'
                onChange={this.onCheck}
                asChecked={this.state.selected} />

              <div className="c-modal__foot">
                <div className="c-modal__actions c-modal__actions--secondary">
                  <button className="o-btn u-accent-color" type="button" onClick={this.props.onHide}>
                    {formatMessage('global.cancel')}
                  </button>
                </div>
                <div className="c-modal__actions">
                  <button className="o-btn o-btn--primary" disabled={submitting} type="submit">
                    {formatMessage('global.apply')}
                  </button>
                </div>
              </div>
            </form>
          }
          {
            related == 'parents' &&
            <form onSubmit={handleSubmit(() => this.editOrganizationSubmit(related))}>
              <CheckBoxGrp
                checkList={allData}
                asName='name'
                asLabel='name'
                onChange={this.onChecked}
                asChecked={this.state.parents} />


              <div className="c-modal__foot">
                <div className="c-modal__actions c-modal__actions--secondary">
                  <button className="o-btn u-accent-color" type="button" onClick={this.props.onHide}>
                    {formatMessage('global.cancel')}
                  </button>
                </div>
                <div className="c-modal__actions">
                  <button className="o-btn o-btn--primary" disabled={submitting} type="submit">
                    {formatMessage('global.apply')}
                  </button>
                </div>
              </div>
            </form>
          }

        </div>

      </React.Fragment>
    );
  }
  public render() {
    const { related } = this.props;

    const content = related ? this.renderRelated() : this.renderEdit()
    return (
      <div className="c-modal" style={{ minHeight: '20%' }}>
        <div className="c-modal__view">
          {content}
        </div>
      </div>
    );
  }
}

const addOrgUnitValidate = (formProps) => {
  // todo: validation
  const errors: any = {}
  if (!formProps.name) {
    errors.name = 'Required';
  }
  if (!formProps.code) {
    errors.code = 'Required';
  }

  //console.log('err..', formProps, errors)
  return errors
};

export default reduxForm<any, IntProps>({
  form: 'addOrgUnit',
  validate: addOrgUnitValidate
})(EditOrgUnit);
