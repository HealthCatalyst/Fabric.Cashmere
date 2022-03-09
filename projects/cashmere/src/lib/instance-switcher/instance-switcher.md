##### General Development Information

The instance switcher is currently a display only component. This means that managing the collection of instances and which one is currently selected is the responsibility of the consuming application.

The required inputs to allow the instance switcher to work as expected are as follows:

- `instances`: This is the list of instances that will be displayed on the Instance Switcher. If any are added or removed, including an `added` or `removed` event from the Instance Switcher, then the input value needs to be updated to reflect this.
- `selectedKey`: The instance with the key provided to this input will be shown as selected in the Instance Switcher. If this is changed, including a `selected` event firing in the Instance Switcher, then this input needs to be updated to reflect that.
- `isOpen`: This is only required if the `closable` input is set to `true` (which is the default value). Controls whether or not to show the Instance Switcher.

All outputs should also be handled outside of the Instance Switcher component. The `closed` output event is only optional if the `closable` input value is set to `false`.

Examples of how the above operations can be handled are shown in the Instance Switcher Overview example.
