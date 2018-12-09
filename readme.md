School Data Project
----------------------

In this project I set out to create a data dashboard based on school exam results.

GCSE pupils sit exams in English, Maths, Science, History, Computer Science, Art and Food.
The results are then analysed by gender, by cohort, and by age and attendance for boys and girls
using bar charts.

Then the results are put into bar charts for each subject so that a comparison can be made
between genders, cohort, age and attendance.

Finally the results are analysed to find correlation between two variables.

UX
--

User stories are as follows:

User story 1:  School would like a data dashboard showing pupils results by gender, cohort and to see
if there is a correlation between age, grade and attendance.  It is important
that the dashboard is clear and informative and easy to navigate around.

User story 2:  Local authorities need this data to plan for next school year so it is important
that the dashboard is clear and informative and easy to navigate around.

All users want to be able to see analysed data in the form of graphs for all pupils in English and Maths,
as well as to be able to use a selector to analyse exam performance in these subjects by cohorts.

All users want to see the graphs on a white screen background as this will enable graphs to be read
clearly.

Features
----------------


Existing features
------------------
I had to read in my data using crossfilter ndx
Then  I had to set up graph on screen using chaining in my js code in my function
Each graph followed the same process:
i) create a div
ii) create a function
iii) render the graph in the div.

Graphs created were:

i) Bar chart showing number of exam entries by gender.
ii)  Stacked bar chart for Grades achieved by boys and girls for English 
iii) Stacked bar chart for Grades achieved by boys and girls for Maths
iv)  Selector incldued to select results by cohort.
v)  Scatter diagram showing if there is a correlation between age and grade acheived in English.
vi)  Scatter diagram showing if there is a correlation between attendance and maths grade.

Technologies Used
-----------------

I developed my code in cloud9 and committed each change in functionality to github.


Testing
-------



Deployment
----------


Credits
-------


