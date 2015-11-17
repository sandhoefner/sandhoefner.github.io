package com.mycompany.myfirstapp;

import android.content.DialogInterface;
import android.content.SharedPreferences;
import android.support.v7.app.AlertDialog;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.text.InputType;
import android.view.Menu;
import android.view.MenuItem;
import android.app.Activity;
import android.content.Intent;
import android.graphics.Bitmap;
import android.graphics.Color;
import android.net.Uri;
import android.os.Bundle;
import android.util.Log;
import android.view.MotionEvent;
import android.view.View;
import android.view.animation.Animation;
import android.view.animation.AnimationUtils;
import android.widget.EditText;
import android.widget.ImageView;
import android.widget.Toast;
import java.util.*;

/**
 * This activity displays an image on the screen.
 * The image has three different regions that can be clicked / touched.
 * When a region is touched, the activity changes the view to show a different
 * image.
 *
 */


public class beastmaker1000 extends AppCompatActivity
        implements View.OnTouchListener
{

    /**
     * Create the view for the activity.
     *
     */

    @Override public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_beastmaker1000);
        setTitle("Beastmaker 1000");
        SharedPreferences sp = getSharedPreferences("bg", 0);
        String hexaColor = sp.getString("hexa", "#FFFFFF"); //default color will be #FFFFFF
        getWindow().getDecorView().setBackgroundColor(Color.parseColor(hexaColor));

        ImageView iv = (ImageView) findViewById (R.id.image);
        if (iv != null) {
            iv.setOnTouchListener (this);
        }

        toast ("Touch a hold!");
    }

/*
    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        // Inflate the menu; this adds items to the action bar if it is present.
        getMenuInflater().inflate(R.menu.menu_beastmaker1000, menu);
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
    public int brown = Color.rgb(128,64,2);
    public int darkblue = Color.rgb(63,72,204);

    public void popup(final Activity mama_bear, final String formal_name, final String precise_name) {
        // 1. Instantiate an AlertDialog.Builder with its constructor
        AlertDialog.Builder builder = new AlertDialog.Builder(mama_bear);
        // 2. Chain together various setter methods to set the dialog characteristics
        final SharedPreferences sp = getSharedPreferences(precise_name, 0);
        final EditText input = new EditText(mama_bear);
        input.setHint("New PR");
        input.setInputType(InputType.TYPE_CLASS_NUMBER | InputType.TYPE_NUMBER_FLAG_DECIMAL);
        builder.setMessage("PR: " + sp.getString(precise_name, "0"))
                .setTitle(formal_name)
                .setPositiveButton("OK", new DialogInterface.OnClickListener() {
                    public void onClick(DialogInterface dialog, int id) {
                        // User clicked OK button
                        String pr = input.getText().toString();
                        if (!pr.equals("")) {
                            SharedPreferences.Editor editor = sp.edit();
                            editor.putString(precise_name, pr);
                            editor.apply();
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
                if (ct.closeMatch (red, touchColor, tolerance)) popup(this,"Jug","bm1 jug");
                else if (ct.closeMatch (orange, touchColor, tolerance)) popup(this,"Bad Sloper","bm1 bad sloper");
                else if (ct.closeMatch (yellow, touchColor, tolerance)) popup(this,"Good Sloper","bm1 good sloper");
                else if (ct.closeMatch (lightgreen, touchColor, tolerance)) popup(this,"Middle Pocket","bm1 middle pocket");
                else if (ct.closeMatch (black, touchColor, tolerance)) popup(this,"Top Pocket","bm1 top pocket");
                else if (ct.closeMatch (gray, touchColor, tolerance)) popup(this,"Top Edge","bm1 top edge");
                else if (ct.closeMatch (lightblue, touchColor, tolerance)) popup(this,"Good 2-Finger Pocket","bm1 good 2-finger pocket");
                else if (ct.closeMatch (darkgreen, touchColor, tolerance)) popup(this,"Bottom Pocket","bm1 bottom pocket");
                else if (ct.closeMatch (purple, touchColor, tolerance)) popup(this,"Middle Edge","bm1 middle edge");
                else if (ct.closeMatch (tan, touchColor, tolerance)) popup(this,"Good Edge","bm1 good edge");
                else if (ct.closeMatch (brown, touchColor, tolerance)) popup(this,"Bad 2-Finger Pocket","bm1 bad 2-finger pocket");
                else if (ct.closeMatch (darkblue, touchColor, tolerance)) popup(this,"Bad Edge","bm1 bad edge");

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
