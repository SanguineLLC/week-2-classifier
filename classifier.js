function classifier(input) { 
    let students = [...input];
    const maxPerGroup = 3; 
    const currentYear = 2019; 
    const sumAge = (ages) => ages.reduce((sum, age) => sum + age, 0); 
    const maxAge = (ages) => Math.max(...ages); 
    const sortArray = (arr) => arr.sort((a, b) => a - b); 
    const calcAge = (dob) => { 
      let date = new Date(dob) 
      return currentYear - date.getFullYear() 
    } 
   
    students.forEach(student => { 
      student.age = calcAge(student.dob); 
    }) 
   
    students = students.sort((studentA, studentB) => studentA.age - studentB.age); 
   
   
    const groups = []; 
    while (students.length > 0) { 
      let group = []; 
      for (let i = 0; i < maxPerGroup; i++) { 
        group.push(...students.splice(0, 1)); 
        if (students.length < 1 || students[0].age - group[0].age > 5) 
          break; 
      } 
      groups.push(group); 
    } 
   
    const output = { noOfGroups: groups.length }; 
    for (let i = 0; i < groups.length; i++) { 
      const groupName = 'group' + Number(i + 1); 
      output[groupName] = { members: groups[i] }; 
      const ages = []; 
      const regNos = []; 
      for (const student of output[groupName].members) { 
        ages.push(student.age); 
        regNos.push(student.regNo); 
      } 
   
      output[groupName].oldest = maxAge(ages); 
      output[groupName].sum = sumAge(ages); 
      output[groupName].regNos = sortArray(regNos).map(i => Number(i)); 
    } 
   
    return output; 
  } 
   
  export default classifier;