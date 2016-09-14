% 6.869 Advances in Computer Vision
% MATLAB Tutorial 

% Matlab at MIT: http://web.mit.edu/matlab/www/
%
% To access a remote Matlab installation, say on Athena/Linux cluster, 
% use the following on the different platforms:
%  On Windows: Use Putty + Xming to connect to remote server
%  On Mac/Linux: In Terminal, type: ssh -X server_name
%

%==========================================================================
% Why Matlab?
% - Very popular in Computer Vision reseach community
% - Very powerful for fast prototyping and visualization


%==========================================================================
% Simple scalar operations 
% 
% - Semicolon (;) is a powerful debugging tool! (no need for printfs)
% - Code cell (%%): use ctrl+enter to evaluate


%% +(plus), -(minus), /(divide), *(multiply), ^(exponentiate)

a = 5
b = 2
c = 3

(a + b)*c

a^c

whos    % Lists workspace variables



%==========================================================================
% Creating a vector/matrix

%% Vector definition
a = [1, 2, 3, 4]    % Use comma (,) to create a row-vector
a = [1  2  3  4]    % Space = (,)
b = [1; 2; 3; 4]    % Use semi-colon (;) to create a column vector

%% colon (:) and transpose (')
an = 1:4            % J:K is the same as [J, J+1, ..., K]
an = 1:0.2:2        % J:D:K is the same as [J, J+D, ..., J+m*D], m = floor((K-J)/D)
bn = an'            % Use quote (') to transpose

%% Matrix definition
A = [1, 2, 3, 4 ; 5, 6, 7, 8]

%% Stacking vectors
A1 = [1, 2, 3, 4]
A2 = [5, 6, 7, 8]
AN = [A1;A2]

%% functions for creating vectors and matrices
AZero = zeros(2, 4) % A 2x4 matrix of zeros
AOnes = ones(5)     % A 5x5 matrix of ones
I = eye(4)          % A 4x4 identity matrix

%% functions for manipulating vector/matrix structure
repmat(A,[2,3])     % tiling of copies of A

%% the 'help' command
help repmat         % Display help text in Command Window
doc repmat


%==========================================================================
% Indexing
%
% - MATLAB is 1-based!
% - MATLAB's internal representation is column-major (openCV is row-major)
% - Can use both subscript and linear indexing


%%
A = randi(10,[5,3]) % A 5x3 matrix of uniformly random integers in range [1,10]

A(3,2)              % Subscript (row,col) indexing
A(8)                % Linear indexing
ind = sub2ind(size(A),3,2)  % Converting subscript --> linear
[i,j] = ind2sub(size(A),8)  % Converting linear --> subscript


A(1:2,2:3)          % Select a block
A(3,:)              % Select a row
A(2:end-1,2)        % end = the last index in the respective dimension


%% dynamic allocation
%
% - Inefficient if used extensively. Try to allocate sufficient space
%   in advance, e.g. A = zeros(M,N)
A(9,4) = 678


%==========================================================================
%  Matrix operators


%%
A = [1, 2; 3, 4]
B = [1, 3; 2, 4]

A*B     % Matrix multiplication
A.*B    % Element-wise multiplication
A\B     % inv(A)*B, but computed using QR factorization (recall)
        % Ax = b <==> QRx = b <==> Rx = Q'b
        % 1. QR factorization (e.g. Gram–Schmidt)
        % 2. Matrix multiplication d = Q'b
        % 3. Back-substitution Rx = d
A^2
A.^2    % Element wise exponentiation




%==========================================================================
% for/while loops
%  
% - Always try to avoid!
% - Performance is better if executed within a separate function

%% Example: normalize a matrix by rows

A = rand(2000,3000); % some large matrix
ASum = sum(A, 2);

%method 1
tic
ANorm = zeros(size(A));
for i = 1:size(A, 1)
    for j = 1:size(A, 2)
        ANorm(i,j) = A(i,j)/ASum(i);
    end
end
toc

%method 2
tic
ANorm = A./repmat(ASum, 1, size(A, 2));
toc

clear A ASum ANorm;


%% Vectorized operations
%
% - Never write those using for loops

A = [1 2 3 4 ; 5 6 7 8]
min(A)              % Min of each column
max(A(:))           % Max of matrix
find(A <= 6)        % Indices (linear) of elements <= 6
sum(sum(A < 5))     % Counting a logical matrix

mean(A)             % Mean of each column
sqrt(A)             % Element-wise sqrt


%==========================================================================
% Functions vs scripts (this file is a script)

a = 1:4
foo1(a)
a

%% to modify an object
a = foo2(a)



%==========================================================================
% plotting
%
% - 'hold on': superimpose multiple plots in a single axis
% - 'help plot': many usuful plotting configurations


%% Plotting a function

x = -5:0.1:14;
y = 3*x + 6;

figure; hold on;
plot([-5,14],[0,0],'k--'); title('3*x + 6, x\in[-5,14]');
plot(x,y,'b-');


%% Plotting a Gaussian

% Defines the range of the 2D Gaussian function
distMax = 3;
xRange = [-distMax:distMax/100:distMax];
yRange = [-distMax:distMax/100:distMax];
[x, y] = meshgrid(xRange, yRange); % Produces domains for 2-variate functions

% Computes the value of the Gaussian function at each grid point
z = exp(-(x.^2 + y.^2));

% Plotting method 2
figure, surf(x, y, z)
axis([-distMax, distMax, -distMax, distMax, 0, 1]);
shading flat;


%==========================================================================
% Images
%
% - Images are just M x N x C matrices


% Lena (Lena Söderberg), Swedish model, originally cropped from the centerfold of 
% November 1972 issue of Playboy magazine.

% The modern Lena - Halle Berry

%% read images
lena = imread('lena.jpg');
halle = imread('halle.jpg');
size(lena)

%% display
% figure opens a new figure with an axis
% subplot(m,n,p) breaks the figure window into an m-by-n small axes and
% select the p-th axes for the current plot
figure;
subplot(1,2,1); imshow(lena);
subplot(1,2,2); imshow(halle);

%% convert image to grayscale [0,255] values
halle_gray = rgb2gray(halle);   
figure; imshow(halle_gray);

%% resize an image
halle_large = imresize(halle,1.5);
figure; imshow(halle_large);

%% save images
imwrite(halle_gray,'halle_gray.png'); % jpg/ppm/bmp/gif/...



%==========================================================================
% Image Processing
%  
% - Many useful functions in the image processing toolbox: 
%       http://www.mathworks.com/help/toolbox/images/ref/f3-23960.html


%% Image derivatives
halle_gray = im2double(halle_gray);
dmdx = conv2(halle_gray, [-1 0 1; -2 0 2; -1 0 1], 'same');
dmdy = conv2(halle_gray, [-1 0 1; -2 0 2; -1 0 1]', 'same');
figure;
h1=subplot(1,3,1); imshow(halle_gray);
h2=subplot(1,3,2); imagesc(dmdx); axis equal tight; title('dmdx');
h3=subplot(1,3,3); imagesc(dmdy); axis equal tight; title('dmdy');
linkaxes([h1,h2,h3]);
colormap gray;


%% gradient magnitude
mag = sqrt(dmdx.^2+dmdy.^2);
figure;
imagesc(mag); colormap gray; axis equal tight;


%% smoothing
filter = fspecial('gaussian',11,3); % Create predefined 2-D filters
halle_smooth = imfilter(halle_gray, filter, 'same', 'replicate');
figure;
subplot(1,3,1); imshow(halle_gray); title('Source');
subplot(1,3,2); imagesc(filter); axis equal tight; title('Filter');
subplot(1,3,3); imshow(halle_smooth); title('Smoothed');

%% ==========================================================================
% parallel in Matlab
matlabpool
b = ones(1,10);
parfor i=1:length(b)
    a(i) = 2*b(i);
end

%% sparse matrix
c = sparse(1, 10)
b = rand(1,10)>0.5;
b1 = sparse(b)
b2 = full(b1)

% sparse matrices are good for storing data that has many zero values
%  they take significantly less memory depending on the level of sparsity
%  by only storing the index and the data value
%
% These are used in PSet1 to store the constraints
%
% Note that while sparse matrices can be extremely useful in some applications
% they are not well suited when the data is not sparse. Also, many Matlab
% functions are designed to only work with full matrices.

%==========================================================================
% UI

%% Example: crop an image region

figure; imshow(halle);

rect = getrect;                     % select rectangle. See also: impoint, imline, impoly
halle_crop = imcrop(halle,rect);    % crop

figure; imshow(halle_crop);


%==========================================================================
% Other useful MATLAB resources:

% MATLAB documentation
%       http://www.mathworks.com/help/index.html
% File Exchange
%       http://www.mathworks.com/matlabcentral/fileexchange/
% Code Vectorization Guide
%       http://www.mathworks.com/support/tech-notes/1100/1109.html
% Writing Fast MATLAB code
%       http://www.mathworks.com/matlabcentral/fileexchange/5685
% MATLAB array manipulation tips and tricks
%       http://home.online.no/~pjacklam/matlab/doc/mtt/index.html
% 

