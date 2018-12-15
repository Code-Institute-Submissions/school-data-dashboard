#School Data Project
----------------------

In this project I set out to create a data dashboard based on school exam results.

GCSE pupils sit exams in English, Maths, Science, History, Computer Science, Art and Food.
The results are then analysed by gender, by cohort, and by age and attendance for boys and girls
using bar charts.

Then the results are put into bar charts for each subject so that a comparison can be made
between genders, cohort, age and attendance.

Finally the results are analysed to find correlation between two variables.

##UX
--

User stories are as follows:

User story 1:  School would like a data dashboard showing pupils results by gender, cohort and to see
if there is a correlation between age, grade and attendance.  It is important
that the dashboard is clear and informative and easy to navigate around.  Data on English and Maths
to be shown in a stacked bar chart so that percentages of pupils achieving each grade are clear.
Relevant brief comments for any trends in cohorts to be shown after each graph.

User story 2:  Local authorities need this data to plan for next school year so it is important
that the dashboard is clear and informative and easy to navigate around.  Local authorities need data to 
be shown on all subjects, not just English and Maths.

All users want to be able to see analysed data in the form of graphs for all pupils in English and Maths,
as well as to be able to use a selector to analyse exam performance in these subjects by cohorts.

All users want to see the graphs on a white screen background as this will enable graphs to be read
clearly.

##Features
----------------
The spa enabled users to analyse exam data by gender and cohort using the selector on the top left of the screen.

##Existing features
------------------
I had to read in my data using crossfilter ndx
Then  I had to set up graph on screen using chaining in my js code in my function
Each graph followed the same process:
i) create a div
ii) create a function
iii) render the graph in the div.

###Graphs created were:

i) Bar chart showing number of exam entries by gender.
ii)  Stacked bar chart for Grades achieved by boys and girls for English 
iii) Stacked bar chart for Grades achieved by boys and girls for Maths
iv)  Selector incldued to select results by cohort.
v)  Scatter diagram showing if there is a correlation between age and grade acheived in English.
vi)  Scatter diagram showing if there is a correlation between attendance and maths grade.
vii)  Stacked bar charts for pupils exam grades in other subjects.

##Technologies Used
-----------------

I developed my code in cloud9 and committed each change in functionality to github.
I used the dc, d3 and crossfilter javascript libraries to create data visualisations.
I used HTML and CSS to style my spa.

##Testing
-------
SPA was tested before each change was committed to github.
i) First bar chart showing numbers of male and females who took exams was created. Selector then created.  Selector tested to ensure it worked so
that user could view number in each cohort taking exam.  Worked as expected.
ii) Two stacked barcharts created; one for English and one for Maths showing grades acheived by students in these subjects.  Both were fine.
Both stacked bar charts tested against cohort selector.  Did not work as expected.
iii)  Reviewed code for stacked bar charts and created scatter diagrams comparing age and attendance to exam grades.  Cohort selector still not working.
iv)  Code for cohort selector reviewed.  All fine.
v)  Code for each graph created so far reviewed.  Code for Stacked bar chart was not indented correctly.  Corrected the indentation and tried cohort selector
again - it was now working as expected.
vi)  Added in comments for graphs created already.  All looked fine, but comments for maths scatter graph was above it.  Sorted out divs and
moved comments so they were below maths scatter graph.
vii) Created smaller stacked bar graphs for other subjects.  Feedback from users - family, friends and pupils was that it looked fine.
Members of staff at my school were impressed at how selector worked to allow them to analyse data by cohort and gender.


##Deployment
----------
Site was put on github in xxx commits.
Live link for the spa is 

##Credits
---------

Thanks to my students who reviewed this spa and gave some good comments for improvements.
Thanks to my mentor who provided support and encouragement when needed.


