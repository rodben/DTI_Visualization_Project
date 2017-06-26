# Visualization Project to Explain DTI Techniques

## Motivation

Diffusion tensor imaging (DTI) has become a valuable neuroimaging tool, mapping the trajectories of fiber tracts in the white matter of the brain, it is the application of the diffusion tensor model to the brain. While having some limitations to DTI, it is the only noninvasive imaging technique today that permits in vivo dissection of fibers within the brain and enables the characterization of its structure.  
Given their value, processing and visualization tools are being developed by science and engineer students. These students may have a hard time learning about the theories and concepts regarding DTI and DWI, since it isn't part of the science and engineer curriculum. Furthermore, most of the tools and websites available to learn about the topic are only text-based and fail to provide a clear overview of the processes and results.
This is the final project for the IA369 - Data Visualization course, offered on the first semester of 2017, by the Faculty of Electrical and Computing Engineering (FEEC) of University of Campinas (Unicamp). The course was delivered by Paula Paro Costa ([website](http://www.dca.fee.unicamp.br/~paula/)).

## Approach

It was decided to develop a website containing the main concepts, data processing and results regarding Diffusion, DTI, DWI. Animations with and without interactions are used to help explaining each topic, along with a small text to explain what’s going on in the animation.

## Development

The first task was to choose the website layout, we built the project based on template available in this [link](https://tympanus.net/Development/DraggableDualViewSlideshow/). It has a good structure to navigate through the topics and the user can learn more about the subject by scrolling down the page. The template also seems to provide smooth and clear navigation interactions. Then the topics were divided and the visualizations to cover each topic were sketched.

## Data (source, transformations)

Most of data presented on the visualizations are MRI scans from the developers, data transformations were performed by open access tools, such as [FSL](https://fsl.fmrib.ox.ac.uk/fsl/fslwiki/), [TrackVis](http://www.trackvis.org/) or implemented algorithms developed by us.
The images presented on the main topic pages were extracted from internet and the references are present on the figure_references.txt file present on the img folder.  

## Tools

* HTML and CSS for the website layout
* [Three.js](https://threejs.org/), a JavaScript library for 3D animations in a web browser. It uses [WebGL](https://www.khronos.org/webgl/) to render the graphics.
* The X Toolkit was used to render Medical Images and Tract files, it also uses WebGL to render volumes. The XTK is open available in this [link](https://github.com/xtk/X)

## Justification and Premises

The website is intended for postgraduate science and engineer students, it is assumed that the user is familiar with mathematical equations, linear algebra and related mathematical terms.

## Lessons learned

WebGL already offers great flexibility to render complex volumes over internet, however, obviously, it depends on the user graphical power to improve performance. The development of sophisticated scenes can be time consuming, thus an API such as Three.js is highly recommended.
Many open tools are available to scientific data visualization, expand and/or incorporate those can add real value to several online scientific reports. The subjects approached are very complex and hard to explain only through text, we hope that the visualization will help students to get a glimpse of the aspects regarding these topics.

## Future work / improvements

Improve performance by rendering only visualizations that are selected on drop down.
Add concept visualization to Conversion DWI to DTI section.

## Developers/Contact

Raphael Voltoline - raphavoltoline.rvr@gmail.com  
Rodolfo Luis Tonoli - rltonoli@gmail.com  
Rodrigo Benites - rbenites@dca.fee.unicamp.br  
William Javier Garcia Herrera - wilomaku@gmail.com  

## License

This website is developed under the template available on
[Template](http://tympanus.net/Development/DraggableDualViewSlideshow/)

More on the license is available here:
[License](http://tympanus.net/codrops/licensing/)

[© Codrops 2014](http://www.codrops.com)
