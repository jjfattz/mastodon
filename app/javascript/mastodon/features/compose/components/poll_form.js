import React from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import ImmutablePureComponent from 'react-immutable-pure-component';
import { defineMessages, injectIntl, FormattedMessage } from 'react-intl';
import IconButton from '../../../components/icon_button';
import classNames from 'classnames';

const messages = defineMessages({
  option_placeholder: { id: 'compose_form.poll.option_placeholder', defaultMessage: 'Choice {number}' },
  add_option: { id: 'compose_form.poll.add_option', defaultMessage: 'Add a choice' },
  remove_option: { id: 'compose_form.poll.remove_option', defaultMessage: 'Remove this choice' },
  poll_duration: { id: 'compose_form.poll.duration', defaultMessage: 'Poll duration' },
});

@injectIntl
class Option extends React.PureComponent {

  static propTypes = {
    title: PropTypes.string.isRequired,
    index: PropTypes.number.isRequired,
    isPollMultiple: bool,
    onChange: PropTypes.func.isRequired,
    onRemove: PropTypes.func.isRequired,
    intl: PropTypes.object.isRequired,
  };

  handleOptionTitleChange = (e) => {
    this.props.onChange(this.props.index, e.target.value);
  };

  handleOptionRemove = (e) => {
    this.props.onRemove(this.props.index);
  };

  render () {
    const { isPollMultiple, title, index, intl } = this.props;

    return (
      <li>
        <label className={classNames('poll__text')}>
          <span className={classNames('poll__input', { checkbox: isPollMultiple })} />

          <input
            type='text'
            placeholder={intl.formatMessage(messages.option_placeholder, { number: index + 1 })}
            value={title}
            onChange={this.handleOptionTitleChange} />

          <div className='poll__option__cancel'>
            <IconButton title={intl.formatMessage(messages.remove_option)} icon='times' onClick={this.handleOptionRemove} />
          </div>
        </label>
      </li>
    );
  }
}

export default
@injectIntl
class PollForm extends ImmutablePureComponent {

  static propTypes = {
    options: ImmutablePropTypes.list,
    expiresIn: PropTypes.number,
    isMultiple: PropTypes.bool,
    onChangeOption: PropTypes.func.isRequired,
    onAddOption: PropTypes.func.isRequired,
    onRemoveOption: PropTypes.func.isRequired,
    onChangeSettings: PropTypes.func.isRequired,
    intl: PropTypes.object.isRequired,
  };

  handleAddOption = () => {
    this.props.onAddOption('');
  };

  render () {
    const { options, expiresIn, isMultiple, onChangeOption, onRemoveOption } = this.props;

    if (!options) {
      return null;
    }

    return (
      <div className='compose-form__poll-wrapper'>
        <div className='compose-form__poll-options-wrapper'>
          <ul>
            {options.map((title, i) => <Option title={title} index={i} onChange={onChangeOption} onRemove={onRemoveOption} isPollMultiple={isMultiple} />)}
            { options.size < 4 && <li><button className='poll__link' onClick={this.handleAddOption}><FormattedMessage {...messages.add_option} /></button></li> }
          </ul>
        </div>

        <hr />

        <FormattedMessage {...messages.poll_duration} />: TODO
        TODO: multiple vs single
      </div>
    );
  }

}
