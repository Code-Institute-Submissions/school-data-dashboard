School Data Project
----------------------

In this project I set out to create a data dashboard based on school exam results.

Year 11 GCSE pupils sit exams in English, Maths, Science, History, Computer Science, Art and Food.
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
that the dashboard is clear and informative and easy to navigate around.  Data on English and Maths
to be shown in a stacked bar chart so that percentages of pupils achieving each grade are clear.
Relevant brief comments for any trends in cohorts to be shown after each graph.

User story 2:  Local authorities need this data to plan for next school year so it is important
that the dashboard is clear and informative and easy to navigate around.  Local authorities need data to 
be shown on all subjects, not just English and Maths.

User story 3:  All users want to be able to see analysed data in the form of graphs for all pupils in English and Maths,
as well as to be able to use a selector to analyse exam performance in these subjects by cohorts.

User story 4:  All users want to see the graphs on a white screen background as this will enable graphs to be read
clearly.  Cohort selector to be prominent at top left of screen initially with facility to move with screen as 
user scrolls down page.

User story 5:  Teachers and Local Authority users want to see the table of results for all students at the
end of the spa.  As user goes through table current cell being studied should show in a contrasting colour.

User story 6:  Link to national data provided at end of spa for user to look up data on all pupils in England.

The wireframe for this project is included in the wireframe document in the UX folder.



Features
----------------
The spa enabled users to analyse exam data by gender and cohort using the selector on the top left of the screen.

Graphs displayed are bar charts, stacked bar charts and scatter diagrams.
The scatter diagrams allowed the relationship between grades, attendance and age at time of exam to be explored
by gender.
The bar chart allows a user to see how many girls and boys took exams in summer 2018.
The stacked bar charts show the percentages of boys and girls achieving each grade in the Summer 2018 exams.

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
vii)  Stacked bar charts for pupils exam grades in other subjects.

Features Left to Implement
--------------------------
The SPA allows the user to filter by cohort on the percentage of grades achieved by each cohort however
average grades by subject may have been useful with the selector allowing the user to look at different
average grades achieved by different cohorts.  However this comes with a caveat as different pupils have 
different starting points so this would need to be taken into account when viewing averages.  So it would 
be useful to have starting points for each pupil included in another csv so that progress in terms of grades
could be calcuated and displayed on graphs as an average per pupil, then from this average an average progress
for each cohort could then be calculated.  This would mean that the new amended csv file would need to included
data on progress, perhaps using a point systems so that this could be analysed by crossfilter and d3 and then 
displayed on a bar chart using dc.  

Finally another useful feature that could be implemented would be expected attainment for each pupil plotted 
against actual progress made by the pupil.  Again the initial csv file would need to include an expected attainment
grade for each pupil so that progress over the year could be calculated by comparing the points value of this with 
the points value of attainment.

Both features would take a good deal of time to implement and would involve devising a point system for the grades
used in the 9-1 GCSE system.   A pie chart could then be plotted to show the percentage of pupils who had made expected 
progress, the percentage of pupils who had not made expected progress, and the percentage of pupils who had made
above expected progress.  Using the cohort selector it would then be possible to analyse progress made for each cohort.

If all these features were to be implemented the user would have a complete picture of progress made by each pupi,
and would be a challenge to implement successfully.


Technologies Used
-----------------

I developed my code in cloud9 and committed each change in functionality to github.
I used the dc, d3 and crossfilter javascript libraries to create data visualisations.
I used HTML and CSS to style my spa.
HTML was used to mark up my spa.
CSS was used to style my page.
I used svg to produce lines and shapes for my graphs offical website https://www.w3.org/Graphics/SVG/.   Svg is a markup language for 2D graphics and has a 
set of graphics script interfaces for use with various javascript libraries.
I used crossfilter to analyse my data and dc and d3 to display my data in appropriate graphs and charts.
Crossfilter (github community https://github.com/crossfilter) is a javascript library that allows you to analyse data using filtering and aggregation.   
d3  ( official website https://d3js.org/) is a javascript library for manipulating and displaying data on a data dashboard.  It is used in 
conjunction with HTML, CSS, crossfilter  and dc (official website https://dc-js.github.io/dc.js/) to bring data to life, providing useful visualations for a user.
If a selector is added to a chart then the user can interactively examine graphs gaining more useful data.
dc is a javascript library and enables d3 and crossfilter allowing them to work together to produce charts and graphs.
I used these three javascript librarries to display my data in line with my user stories

User story 1 features implemented:  Data on English and Maths  is shown in a stacked bar chart so that percentages of pupils achieving each grade are clear.
Relevant brief comments for any trends in cohorts to be shown after each graph.

User story 2 features implemented:  Data is be shown on all subjects, not just English and Maths in stacked bar charts at bottom of Spa.

User story 3 features implemented:  Data in all graphs can be analysed using cohort selector. 

User story 4 features implemented:  White background for dashboard implemeted with prominent cohort selector that stays fixed on page.

User story 5 features implemented:  d3 used to show data for all students in a chart for user to see.  As user goes through data in chart,
cell selected highlights in pale blue.

User story 6 features implemented:  links to national data by county and infographic added so that user can compare data from school against national data.
 


Testing
-------
The SPA was tested before each change was committed to github.
i) First bar chart showing numbers of male and females who took exams was created. Selector then created.  Selector tested to ensure it worked so
that user could view number in each cohort taking exam.  Worked as expected after a good deal of hard work getting it to work with each chart 
due to a problem with code in functions not being properly aligned.
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
viii) Created overall table of results showing results each student got for reference purposes of user.  Checked it rendered as expected on screen.
All good.  
ix) National data links checked to ensure that they work and that they open in new window.  Worked as expected.
x)  Responsive tested throughout project.  Media queries and containers checked for each graph.  Changes made as work progressed.  All work as expected.



Deployment
----------
Site was put on github using 19 commits.
Live link for the spa is https://debbiect246.github.io/school-data-dashboard/
 
Credits
---------

Thanks to  teachers and students at my school who reviewed this spa and gave some good comments for improvements.
Thanks to some fellow code institute students who reviewed my app and posted comments in the code institute slack room.
Thanks to my mentor who provided support and encouragement when needed and gave me some good ideas for improving my work including
making my cohort selector area larger, so that it was noticeable, and also suggesting that the cohort selector button
stayed fixed in position as the screen was scrolled so that a user could use it to select cohorts to analyse further on 
down the spa for other subjects.


