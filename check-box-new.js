
const confirmationMailUserList = [
  {
    id: 'guest',
    name: 'Guest',
  },
  {
    id: 'booker',
    name: 'Booker',
  },
  {
    id: 'booker_admin',
    name: 'Booker Admin',
  },
];
const [selected, setSelected] = useState(['guest']);

{confirmationMailUserList.map((each) => (
                    <div key={each.id} className={cx('send-email-options-checkbox', amends.className)}>
                      <Input
                        key="each"
                        checked={selected.includes(each.id)}
                        className="radio-style-email"
                        onChange={(ev) => {
                          if (selected.includes(ev.target.value)) {
                            setSelected(selected.filter((va) => va !== ev.target.value));
                          } else {
                            setSelected([ev.target.value, ...selected]);
                          }
                        }}
                        type="checkbox"
                        value={each.id}
                      />
                      <Label className="email-selected">
                        {each.name}
                      </Label>
                    </div>
                  ))}
                  
                  
                  
