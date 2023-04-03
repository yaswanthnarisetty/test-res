import React, { useState } from "react";
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  InputLabel,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";
import { Box } from "@mui/material";

const options = [
  {
    label: "Fruits",
    options: [
      { value: "apple", label: "Apple" },
      { value: "banana", label: "Banana" },
      { value: "orange", label: "Orange" },
    ],
  },
  {
    label: "Vegetables",
    options: [
      { value: "carrot", label: "Carrot" },
      { value: "broccoli", label: "Broccoli" },
      { value: "spinach", label: "Spinach" },
    ],
  },
];

function CheckboxGroup() {
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleOptionChange = (option) => {
    if (selectedOptions.includes(option)) {
      setSelectedOptions(selectedOptions.filter((o) => o !== option));
    } else {
      setSelectedOptions([...selectedOptions, option]);
    }
  };

  return (
    <Box>
    <InputLabel id="skill-set">skill set</InputLabel>
    <FormControl component="fieldset" id="skill-set">
      <FormLabel component="legend">Select Options</FormLabel>
      <FormGroup>
        {options.map((optionGroup) => (
          <React.Fragment key={optionGroup.label}>
            <ListItem>
              <ListItemIcon>
                <Checkbox
                  checked={selectedOptions.includes(optionGroup.label)}
                  onChange={() =>
                    handleOptionChange(optionGroup.label)
                  }
                />
              </ListItemIcon>
              <ListItemText primary={optionGroup.label} />
            </ListItem>
            {selectedOptions.includes(optionGroup.label) && (
              <List dense>
                {optionGroup.options.map((option) => (
                  <ListItem key={option.value}>
                    <ListItemIcon>
                      <Checkbox
                        checked={selectedOptions.includes(option.value)}
                        onChange={() =>
                          handleOptionChange(option.value)
                        }
                      />
                    </ListItemIcon>
                    <ListItemText primary={option.label} />
                  </ListItem>
                ))}
              </List>
            )}
          </React.Fragment>
        ))}
      </FormGroup>
    </FormControl>
    </Box>
  );
}

export default CheckboxGroup;
