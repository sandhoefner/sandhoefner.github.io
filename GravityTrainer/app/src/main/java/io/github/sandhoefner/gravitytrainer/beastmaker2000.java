package io.github.sandhoefner.gravitytrainer;

import android.app.Activity;
import android.content.DialogInterface;
import android.content.SharedPreferences;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.graphics.Canvas;
import android.graphics.Color;
import android.graphics.Paint;
import android.os.Bundle;
import android.support.v7.app.AlertDialog;
import android.support.v7.app.AppCompatActivity;
import android.text.InputType;
import android.util.Log;
import android.view.MotionEvent;
import android.view.View;
import android.widget.EditText;
import android.widget.ImageView;
import android.widget.Toast;

/**
 * This activity displays an image on the screen.
 * The image has three different regions that can be clicked / touched.
 * When a region is touched, the activity changes the view to show a different
 * image.
 *
 */


public class beastmaker2000 extends AppCompatActivity
        implements View.OnTouchListener
{

    /**
     * Create the view for the activity.
     *
     */

    @Override public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_beastmaker2000);
        setTitle("Beastmaker 2000");
        SharedPreferences sp = getSharedPreferences("bg", 0);
        String hexaColor = sp.getString("hexa", "#FFFFFF"); //default color will be #FFFFFF
        getWindow().getDecorView().setBackgroundColor(Color.parseColor(hexaColor));

        ImageView iv = (ImageView) findViewById (R.id.image);
        if (iv != null) {
            iv.setOnTouchListener (this);
        }

        toast ("Touch a hold to view/edit your record!");

        // this shit has to be in here. you're a stranger to java and android so don't be an asshole
        // just try dumbshit. google doesn't have the answer to every dumbass question
        // rubber duck debugging
//        DisplayMetrics displaymetrics = new DisplayMetrics();
//        int height = displaymetrics.heightPixels;
//        int width = displaymetrics.widthPixels;
//        Bitmap bm2_bitmap = Bitmap.createBitmap(200, 200, Bitmap.Config.ARGB_8888);
        BitmapFactory.Options opt = new BitmapFactory.Options();
        opt.inMutable = true;
//        Bitmap bp = BitmapFactory.decodeResource(getResources(), R.raw.white, opt);
        Bitmap bm2_bitmap = BitmapFactory.decodeResource(getResources(), R.drawable.beastmaker_2000, opt);
        //  getWindowManager().getDefaultDisplay().getMetrics(displaymetrics);
        //  Bitmap bm2_bitmap = Bitmap.createScaledBitmap(b, ScreenWidth, ScreenHeight, false);

        Canvas canvas = new Canvas(bm2_bitmap);
        final Paint myPaint = new Paint();
        myPaint.setColor(black);
        myPaint.setTextSize(20);

        canvas.drawText("Some Text", 50, 50, myPaint);
    }

/*
    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        // Inflate the menu; this adds items to the action bar if it is present.
        getMenuInflater().inflate(R.menu.menu_beastmaker2000, menu);
        return true;
    }

    @Override
    public boolean onOptionsItemSelected(MenuItem item) {
        // Handle action bar item clicks here. The action bar will
        // automatically handle clicks on the Home/Up button, so long
        // as you specify a parent activity in AndroidManifest.xml.
        int id = item.getItemId();

        //noinspection SimplifiableIfStatement
        if (id == R.id.action_settings) {
            return true;
        }

        return super.onOptionsItemSelected(item);
    }
*/



    public int pink = Color.rgb(254,174,201);
    public int red = Color.rgb(240,27,34);
    public int orange = Color.rgb(251,128,41);
    public int white = Color.rgb(254,250,255);
    public int yellow = Color.rgb(252,244,0);
    public int lightgreen = Color.rgb(93,255,0);
    public int black = Color.rgb(0,0,0);
    public int gray = Color.rgb(195,195,195);
    public int lightblue = Color.rgb(151,218,235);
    public int darkgreen = Color.rgb(41,120,0);
    public int purple = Color.rgb(165,71,165);
    public int hotpink = Color.rgb(255,66,255);
    public int tan = Color.rgb(251,179,88);
    public int brown = Color.rgb(128, 64, 2);
    public int darkblue = Color.rgb(63,72,204);
    public int lavender = Color.rgb(187,191,254);




    public void popup(final Activity mama_bear, final String formal_name, final String precise_name) {
        // 1. Instantiate an AlertDialog.Builder with its constructor
        AlertDialog.Builder builder = new AlertDialog.Builder(mama_bear);

        // 2. Chain together various setter methods to set the dialog characteristics
        final SharedPreferences sp = getSharedPreferences(precise_name, 0);
        final EditText input = new EditText(mama_bear);
        input.setInputType(InputType.TYPE_CLASS_NUMBER | InputType.TYPE_NUMBER_FLAG_DECIMAL);
        input.setHint("New PR");
        builder.setMessage("PR: " + sp.getString(precise_name, "0"))
                .setTitle(formal_name)
                .setPositiveButton("OK", new DialogInterface.OnClickListener() {
                    public void onClick(DialogInterface dialog, int id) {
                        // User clicked OK button
                        String pr = input.getText().toString();
                        if (!pr.equals("")) {
//                                        try {
//                                            Double p_r = Double.parseDouble(pr);
//                                            if (p_r >= 0) {
                            SharedPreferences.Editor editor = sp.edit();
                            editor.putString(precise_name, pr);
                            editor.apply();
//                                            } else {
//                                                AlertDialog.Builder err = new AlertDialog.Builder(mama_bear);
//                                                err.setMessage("Invalid input!");
//                                                AlertDialog err_dialog = err.create();
//                                                err_dialog.show();
//                                              }
//                                        } catch (NumberFormatException dick) {
//                                            AlertDialog.Builder err = new AlertDialog.Builder(mama_bear);
//                                            err.setMessage("Invalid input!");
//                                            AlertDialog err_dialog = err.create();
//                                            err_dialog.show();
//                                        }
//                                    }
                        }
                    }
                }).setView(input);
        // 3. Get the AlertDialog from create()
        AlertDialog dialog = builder.create();
        dialog.show();
    }

    /**
     * Respond to the user touching the screen.
     * Change images to make things appear and disappear from the screen.
     *
     */

    public boolean onTouch (View v, MotionEvent ev)
    {
        boolean handledHere = false;

        final int action = ev.getAction();

        final int evX = (int) ev.getX();
        final int evY = (int) ev.getY();
        int nextImage = -1;     // resource id of the next image to display

        // If we cannot find the imageView, return.
        ImageView imageView = (ImageView) v.findViewById (R.id.image);
        if (imageView == null) return false;

        // When the action is Down, see if we should show the "pressed" image for the default image.
        // We do this when the default image is showing. That condition is detectable by looking at the
        // tag of the view. If it is null or contains the resource number of the default image, display the pressed image.
        // Integer tagNum = (Integer) imageView.getTag ();
        // int currentResource = (tagNum == null) ? R.drawable.p2_ship_default : tagNum.intValue ();

        // Now that we know the current resource being displayed we can handle the DOWN and UP events.

        switch (action) {
            case MotionEvent.ACTION_DOWN :
                //          if (currentResource == R.drawable.p2_ship_default) {
                //              nextImage = R.drawable.p2_ship_pressed;
                //              handledHere = true;

                // } else if (currentResource != R.drawable.p2_ship_default) {
                //   nextImage = R.drawable.p2_ship_default;
                //   handledHere = true;

                //          } else
                handledHere = true;
                break;

            case MotionEvent.ACTION_UP :
                // On the UP, we do the click action.
                // The hidden image (image_areas) has three different hotspots on it.
                // The colors are red, blue, and yellow.
                // Use image_areas to determine which region the user touched.
                int touchColor = getHotspotColor (R.id.image_areas, evX, evY);

                // Compare the touchColor to the expected values. Switch to a different image, depending on what color was touched.
                // Note that we use a Color Tool object to test whether the observed color is close enough to the real color to
                // count as a match. We do this because colors on the screen do not match the map exactly because of scaling and
                // varying pixel density.
                ColorTool ct = new ColorTool ();
                int tolerance = 25;
//                nextImage = R.drawable.p2_ship_default;
                if (ct.closeMatch (pink, touchColor, tolerance)) {
//                    final Activity mama_bear = this;
                    popup(this,"45\u00b0 Sloper","bm2_badSloper");
                }
                else if (ct.closeMatch (red, touchColor, tolerance)) popup(this,"35\u00b0 Sloper","bm2_mediumSloper");
                else if (ct.closeMatch (orange, touchColor, tolerance)) popup(this,"20\u00b0 Sloper","bm2_goodSloper");
//                else if (ct.closeMatch (white, touchColor, tolerance)) int pass = 0;
                else if (ct.closeMatch (yellow, touchColor, tolerance)) popup(this,"Medium 3-Finger Pocket","bm2_topPocket");
                else if (ct.closeMatch (lightgreen, touchColor, tolerance)) popup(this,"Good Edge","bm2_goodEdge");
                else if (ct.closeMatch (black, touchColor, tolerance)) popup(this,"Good Mono","bm2_goodMono");
                else if (ct.closeMatch (gray, touchColor, tolerance)) popup(this,"Back 2 Pocket","bm2_topOuterPocket");
                else if (ct.closeMatch (lightblue, touchColor, tolerance)) popup(this,"Good 2-Finger Pocket","bm2_topInnerPocket");
                else if (ct.closeMatch (darkgreen, touchColor, tolerance)) popup(this,"Mouth Jug","bm2_topMiddleEdge");
                else if (ct.closeMatch (purple, touchColor, tolerance)) popup(this,"Bad Edge","bm2_badEdge");
                else if (ct.closeMatch (hotpink, touchColor, tolerance)) popup(this,"Bad Mono","bm2_badMono");
                else if (ct.closeMatch (tan, touchColor, tolerance)) popup(this,"Bad 2-Finger Pocket","bm2_bottomOuterPocket");
                else if (ct.closeMatch (brown, touchColor, tolerance)) popup(this,"Sloping 2-Finger Pocket","bm2_bottomInnerPocket");
                else if (ct.closeMatch (darkblue, touchColor, tolerance)) popup(this,"Incut Edge","bm2_bottomMiddleEdge");
                else if (ct.closeMatch (lavender, touchColor, tolerance)) popup(this,"Small 3-Finger Pocket","bm2_badbadbad");

                // If the next image is the same as the last image, go back to the default.
                // toast ("Current image: " + currentResource + " next: " + nextImage);
                // if (currentResource == nextImage) {
                //    nextImage = R.drawable.p2_ship_default;
                // }
                // handledHere = true;
                // break;

            default:
                handledHere = false;
        } // end switch

        if (handledHere) {

            if (nextImage > 0) {
                imageView.setImageResource (nextImage);
                imageView.setTag (nextImage);
            }
        }
        return handledHere;
    }

/**
 * Resume the activity.
 */

// @Override protected void onResume() {
//     super.onResume();

//     View v  = findViewById (R.id.wglxy_bar);
//     if (v != null) {
//        Animation anim1 = AnimationUtils.loadAnimation(this, R.anim.fade_in);
//        //anim1.setAnimationListener (new StartActivityAfterAnimation (i));
//        v.startAnimation (anim1);
//     }
// }

/**
 * Handle a click on the Wglxy views at the bottom.
 *
 */

// public void onClickWglxy (View v) {
//     Intent viewIntent = new Intent ("android.intent.action.VIEW",
//                                     Uri.parse("http://double-star.appspot.com/blahti/ds-download.html"));
//     startActivity(viewIntent);

// }


/**
 */
// More methods

    /**
     * Get the color from the hotspot image at point x-y.
     *
     */

    public int getHotspotColor (int hotspotId, int x, int y) {
        ImageView img = (ImageView) findViewById (hotspotId);
        if (img == null) {
            Log.d ("ImageAreasActivity", "Hot spot image not found");
            return 0;
        } else {
            img.setDrawingCacheEnabled(true);
            Bitmap hotspots = Bitmap.createBitmap(img.getDrawingCache());
            if (hotspots == null) {
                Log.d ("ImageAreasActivity", "Hot spot bitmap was not created");
                return 0;
            } else {
                img.setDrawingCacheEnabled(false);
                return hotspots.getPixel(x, y);
            }
        }
    }

    /**
     * Show a string on the screen via Toast.
     *
     * @param msg String
     * @return void
     */

    public void toast (String msg)
    {
        Toast.makeText (getApplicationContext(), msg, Toast.LENGTH_LONG).show ();
    } // end toast

} // end class
